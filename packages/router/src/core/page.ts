import { signal } from "@echojs-ecosystem/reactivity";
import type { Signal } from "@echojs-ecosystem/reactivity";
import { createRouteModel, getRouteState, type RouteInternalState } from "./route.js";
import type { RouterInternal } from "./router.js";
import { resolveRoutePath } from "./navigation.js";
import type {
  Page,
  PageLoaderContext,
  Route,
  RouteErrorView,
  RouteLoadingView,
  RouteView,
} from "./types.js";
import { matchParamsForEntry, type FlatRouteEntry } from "./route-tree.js";
import { rawQueryToTyped } from "./route.js";
import type { AnyPage } from "./types.js";
import {
  cancelLazyViewLoads,
  ensureLazyViewLoaded,
  type LazyRouteViewLoader,
} from "./lazy-view.js";

export type BeforeLoadContext<Params, Query> = PageLoaderContext<Params, Query> & {
  navigationId: number;
};

export type PageKind = "page" | "layout";

export type PageInternalState<Params, Query, Data> = RouteInternalState<Params, Query> & {
  kind: PageKind;
  view?: RouteView<Params, Query, Data>;
  viewLoader?: LazyRouteViewLoader<Params, Query, Data>;
  viewLoadRunId: number;
  beforeLoad?: (ctx: BeforeLoadContext<Params, Query>) => Data | Promise<Data>;
  /** @deprecated Use `beforeLoad` */
  loader?: (ctx: PageLoaderContext<Params, Query>) => Data | Promise<Data>;
  loadingView?: RouteLoadingView;
  errorView?: RouteErrorView;
  $pending: Signal<boolean>;
  $error: Signal<unknown | null>;
  $viewPending: Signal<boolean>;
  $viewError: Signal<unknown | null>;
  $data: Signal<Data | null>;
  loaderRunId: number;
};

const pageStates = new WeakMap<Page<any, any, any>, PageInternalState<any, any, any>>();

export const isPage = (value: Route<any, any>): value is Page<any, any, any> =>
  pageStates.has(value as Page<any, any, any>);

export const isLayoutPage = (value: Route<any, any>): value is Page<any, any, any> => {
  const state = pageStates.get(value as Page<any, any, any>);
  return Boolean(state && state.kind === "layout");
};

export const assertLayoutPage = (value: Route<any, any>, label = "layout"): Page => {
  assertPage(value, label);
  if (!isLayoutPage(value)) {
    throw new TypeError(`${label}: expected createLayoutView() instance.`);
  }
  return value;
};

export const assertPage = (value: Route<any, any>, label = "createRouter"): Page => {
  if (!isPage(value)) {
    throw new TypeError(
      `${label}: only createRouteView() / createLazyRouteView() instances are allowed. Use createRoute() for redirects/guards.`,
    );
  }
  return value;
};

export const getPageState = <Params, Query, Data>(
  page: Page<Params, Query, Data>,
): PageInternalState<Params, Query, Data> => {
  const state = pageStates.get(page);
  if (!state) {
    throw new Error("Unknown page instance");
  }
  return state;
};

export type CreateRouteViewOptions<Params, Query, Data> = {
  name?: string;
  view?: RouteView<Params, Query, Data>;
  viewLoader?: LazyRouteViewLoader<Params, Query, Data>;
  beforeLoad?: (ctx: BeforeLoadContext<Params, Query>) => Data | Promise<Data>;
  /** @deprecated Use `beforeLoad` */
  loader?: (ctx: PageLoaderContext<Params, Query>) => Data | Promise<Data>;
  loadingView?: RouteLoadingView;
  errorView?: RouteErrorView;
};

/** @deprecated Use CreateRouteViewOptions */
export type CreatePageOptions<Params, Query, Data> = CreateRouteViewOptions<Params, Query, Data>;

export const createRouteViewModel = <
  Params = Record<string, never>,
  Query = Record<string, never>,
  Data = void,
>(
  options: CreateRouteViewOptions<Params, Query, Data> | string,
): Page<Params, Query, Data> => {
  const resolved =
    typeof options === "string"
      ? (() => {
          throw new TypeError(
            `createRouteView("${options}") requires { name, view }. Pass an options object.`,
          );
        })()
      : options;

  if (!resolved.view && !resolved.viewLoader) {
    throw new TypeError(
      "createRouteView() requires { view } or createLazyRouteView() requires { view: () => import(...) }.",
    );
  }

  const route = createRouteModel<Params, Query>(resolved.name);
  const baseState = getRouteState(route);

  const $pending = signal(false);
  const $error = signal<unknown | null>(null);
  const $viewPending = signal(false);
  const $viewError = signal<unknown | null>(null);
  const $data = signal<Data | null>(null);

  const state: PageInternalState<Params, Query, Data> = {
    ...baseState,
    kind: "page",
    view: resolved.view,
    viewLoader: resolved.viewLoader,
    viewLoadRunId: 0,
    beforeLoad: resolved.beforeLoad,
    loader: resolved.loader,
    loadingView: resolved.loadingView,
    errorView: resolved.errorView,
    $pending,
    $error,
    $viewPending,
    $viewError,
    $data,
    loaderRunId: 0,
  };

  const page = route as Page<Params, Query, Data>;
  pageStates.set(page, state);

  page.closed.subscribe(() => {
    state.loaderRunId += 1;
    state.viewLoadRunId += 1;
    $pending.set(false);
    $error.set(null);
    $viewPending.set(false);
    $viewError.set(null);
    $data.set(null);
  });

  return Object.assign(page, {
    $pending,
    $error,
    $data,
    beforeLoad: resolved.beforeLoad,
    loader: resolved.loader,
    loadingView: resolved.loadingView,
    errorView: resolved.errorView,
    replace(
      ...args: [Params?, import("./types.js").GoOptions<Query>?]
    ): void {
      const [params, options] = args;
      page.go(
        params as Params,
        { ...options, replace: true } as import("./types.js").GoOptions<Query>,
      );
    },
    resolve(
      params?: Params,
      options?: { query?: Record<string, unknown> },
    ): string {
      return resolveRoutePath(page as Route<any, any>, (params ?? {}) as Record<string, string>, options);
    },
    isActive(): boolean {
      return page.$isOpened.value();
    },
    preload(): void {
      const params = page.$params.value();
      const query = page.$query.value();
      if (params === null) return;
      const navigationId = ++state.loaderRunId;
      void (async () => {
        const viewOk = await ensureLazyViewLoaded(page, navigationId);
        if (!viewOk) return;
        await runPageBeforeLoad(
          page,
          { params, query, navigationId },
          navigationId,
        );
      })();
    },
  });
};

/** @deprecated Use createRouteViewModel */
export const createPageModel = createRouteViewModel;

export const resolveBeforeLoad = <Params, Query, Data>(
  state: PageInternalState<Params, Query, Data>,
): ((ctx: BeforeLoadContext<Params, Query>) => Data | Promise<Data>) | undefined =>
  state.beforeLoad ?? state.loader;

export const runPageBeforeLoad = async <Params, Query, Data>(
  page: AnyPage,
  context: BeforeLoadContext<Params, Query>,
  navigationId: number,
): Promise<boolean> => {
  const state = getPageState(page);
  const routeState = getRouteState(page);
  const router = routeState.router as RouterInternal | null;
  const beforeLoad = resolveBeforeLoad(state);
  if (!beforeLoad) {
    state.$pending.set(false);
    state.$error.set(null);
    state.$data.set(null);
    return true;
  }

  const runId = ++state.loaderRunId;
  state.$pending.set(true);
  state.$error.set(null);

  try {
    const data = await Promise.resolve(beforeLoad(context));
    if (runId !== state.loaderRunId) return false;
    if (router && navigationId !== router.navigationId) return false;
    state.$data.set(data);
    state.$pending.set(false);
    return true;
  } catch (error) {
    if (runId !== state.loaderRunId) return false;
    if (router && navigationId !== router.navigationId) return false;
    state.$error.set(error);
    state.$pending.set(false);
    return false;
  }
};

export const runBeforeLoadChain = async (
  chain: FlatRouteEntry[],
  pathname: string,
  query: Record<string, string>,
  navigationId: number,
): Promise<void> => {
  for (const entry of chain) {
    if (!isPage(entry.route)) continue;
    const viewOk = await ensureLazyViewLoaded(entry.route, navigationId);
    if (!viewOk) break;

    const params = matchParamsForEntry(entry, pathname) as Record<string, string>;
    const ok = await runPageBeforeLoad(
      entry.route,
      {
        params,
        query: rawQueryToTyped(query),
        navigationId,
      },
      navigationId,
    );
    if (!ok) break;
  }
};

export const cancelPageLoads = (pages: Iterable<AnyPage>): void => {
  cancelLazyViewLoads(pages);
  for (const page of pages) {
    const state = getPageState(page);
    state.loaderRunId += 1;
    state.$pending.set(false);
    state.$error.set(null);
    state.$data.set(null);
  }
};
