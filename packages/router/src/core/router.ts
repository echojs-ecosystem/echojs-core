import { computed, signal } from "@echojs-ecosystem/reactivity";
import { runAuthorizationGuard } from "./auth-guard.js";
import { buildRouteLocation, parseLocation } from "./navigation.js";
import {
  flattenRouteTree,
  matchParamsForEntry,
  matchRouteChain,
  type FlatRouteEntry,
} from "./route-tree.js";
import {
  applyRouteClosed,
  applyRouteOpened,
  bindRouteToRouter,
  getRouteState,
  rawQueryToTyped,
} from "./route.js";
import { runRouteGuards } from "./guard-registry.js";
import { toRouteConfigs } from "./route-config.js";
import { buildNamedRoutes } from "./build-named-routes.js";
import {
  resolveErrorViewOption,
  resolveLoadingViewOption,
  resolveNotFoundViewOption,
} from "./resolve-route-view.js";
import { createRouterViewComponent } from "./router-view.js";
import { cancelPageLoads, getPageState, isPage, runBeforeLoadChain } from "./page.js";
import type {
  AnyRoute,
  RouteErrorView,
  RouteLoadingView,
  RouteView,
  Router,
  RouterRoutes,
  RouterViewComponent,
} from "./types.js";

export type RouterModelOptions = {
  history: import("./types.js").RouterHistory;
  routes: readonly import("./path-types.js").RouteTreeEntry[];
  authorizationGuard?: import("./types.js").AuthorizationGuardOptions;
  loadingView?: RouteLoadingView | import("./types.js").AnyPage;
  errorView?: RouteErrorView | import("./types.js").AnyPage;
  notFoundView?: RouteView | import("./types.js").AnyPage;
};

export type RouterInternal = Router & {
  readonly history: import("./types.js").RouterHistory;
  readonly flatRoutes: FlatRouteEntry[];
  readonly options: RouterModelOptions;
  readonly loadingView?: RouteLoadingView;
  readonly errorView?: RouteErrorView;
  navigationId: number;
  sync(): void;
  closeRoute(route: AnyRoute): void;
};

export const createRouterModel = (options: RouterModelOptions): RouterInternal => {
  const globalLoadingView = resolveLoadingViewOption(options.loadingView);
  const globalErrorView = resolveErrorViewOption(options.errorView);
  const globalNotFoundView = resolveNotFoundViewOption(options.notFoundView);

  const routeConfigs = toRouteConfigs(options.routes);
  const flatRoutes = flattenRouteTree(routeConfigs);
  const allRoutes = flatRoutes.map((entry) => entry.route);
  const allPages = allRoutes.filter(isPage);

  const $path = signal("/");
  const $query = signal<Record<string, string>>({});
  const $fullPath = signal("/");
  const $activeRoute = signal<AnyRoute | null>(null);
  const $activeRoutes = signal<AnyRoute[]>([]);
  const $params = signal<Record<string, string>>({});

  const $activePage = computed(() => {
    const routes = $activeRoutes.value();
    for (let i = routes.length - 1; i >= 0; i -= 1) {
      const route = routes[i]!;
      if (isPage(route)) return route;
    }
    return null;
  });

  const $matched = computed((): AnyRoute[] => [...$activeRoutes.value()]);

  const $pending = computed(() => {
    const page = $activePage.value();
    return page ? getPageState(page).$pending.value() : false;
  });

  const $error = computed(() => {
    const page = $activePage.value();
    return page ? getPageState(page).$error.value() : null;
  });

  let started = false;
  let unlisten: (() => void) | null = null;
  let syncing = false;
  let syncQueued = false;
  let navigationId = 0;

  const closeAllRoutes = (): void => {
    cancelPageLoads(allPages);
    for (const route of allRoutes) {
      applyRouteClosed(getRouteState(route));
    }
  };

  const routes = buildNamedRoutes(options.routes);

  let router!: RouterInternal;

  router = {
    history: options.history,
    flatRoutes,
    options,
    loadingView: globalLoadingView,
    errorView: globalErrorView,
    navigationId: 0,
    View: (() => null) as RouterViewComponent,
    $path,
    $query,
    $fullPath,
    $activeRoute,
    $activePage,
    $activeRoutes,
    $matched,
    $params,
    $pending,
    $error,
    routes,

    start() {
      if (started) return;
      started = true;

      for (const entry of flatRoutes) {
        bindRouteToRouter(entry.route, router, entry.path);
      }

      unlisten = options.history.listen(() => {
        router.sync();
      });
      router.sync();
    },

    stop() {
      if (!started) return;
      started = false;
      unlisten?.();
      unlisten = null;
      closeAllRoutes();
      $activeRoute.set(null);
      $activeRoutes.set([]);
      $params.set({});
    },

    go(path: string, opts?: { replace?: boolean }) {
      if (opts?.replace) options.history.replace(path);
      else options.history.push(path);
    },

    navigate(path: string, opts?: { replace?: boolean }) {
      router.go(path, opts);
    },

    replace(path: string) {
      options.history.replace(path);
    },

    back() {
      options.history.back();
    },

    forward() {
      options.history.forward();
    },

    reload() {
      router.sync();
    },

    resolve(route, params, opts) {
      const state = getRouteState(route);
      if (!state.pathTemplate) {
        throw new Error("Route is not registered in a router");
      }
      return buildRouteLocation(
        state.pathTemplate,
        (params ?? {}) as Record<string, string>,
        opts?.query as import("./query.js").QueryRecord | undefined,
      );
    },

    isActive(route) {
      return $activeRoutes.value().includes(route);
    },

    view() {
      return router.View;
    },

    closeRoute(route) {
      if (!$activeRoutes.peek().includes(route)) return;
      options.history.push("/");
    },

    sync() {
      if (syncing) {
        syncQueued = true;
        return;
      }
      syncing = true;
      try {
        for (let attempt = 0; attempt < 8; attempt += 1) {
          const currentNavigationId = ++navigationId;
          router.navigationId = currentNavigationId;

          const location = options.history.getLocation();
          const { pathname, search, query } = parseLocation(location);
          const fullPath = search ? `${pathname}${search}` : pathname;

          $path.set(pathname);
          $query.set(query);
          $fullPath.set(fullPath);

          if (
            options.authorizationGuard &&
            !runAuthorizationGuard(pathname, options.authorizationGuard, options.history)
          ) {
            continue;
          }

          const match = matchRouteChain(pathname, flatRoutes);

          if (!match) {
            cancelPageLoads(allPages);
            $activeRoute.set(null);
            $activeRoutes.set([]);
            $params.set({});
            closeAllRoutes();
            return;
          }

          if (!runRouteGuards(options.history, match.leaf.route, query)) {
            continue;
          }

          const activeSet = new Set(match.chain.map((entry) => entry.route));

          $activeRoute.set(match.leaf.route);
          $activeRoutes.set(match.chain.map((entry) => entry.route));
          $params.set(match.leafParams);

          for (const route of allRoutes) {
            const state = getRouteState(route);
            if (!activeSet.has(route)) {
              applyRouteClosed(state);
              continue;
            }

            const entry = match.chain.find((item) => item.route === route)!;
            const entryParams = matchParamsForEntry(entry, pathname);
            applyRouteOpened(state, {
              params: entryParams,
              query: rawQueryToTyped(query),
              path: pathname,
              fullPath,
            });
          }

          void runBeforeLoadChain(match.chain, pathname, query, currentNavigationId);
          return;
        }
      } finally {
        syncing = false;
        if (syncQueued) {
          syncQueued = false;
          router.sync();
        }
      }
    },
  } satisfies RouterInternal;

  for (const entry of flatRoutes) {
    bindRouteToRouter(entry.route, router, entry.path);
  }

  return Object.assign(router, {
    View: createRouterViewComponent(router, {
      routes: options.routes,
      notFoundView: globalNotFoundView,
      loadingView: globalLoadingView,
      errorView: globalErrorView,
    }),
  });
};

export const getRouterInternal = (router: Router): RouterInternal =>
  router as RouterInternal;
