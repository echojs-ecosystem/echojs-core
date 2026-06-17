import type { ReadonlySignal } from "@echojs-ecosystem/reactivity";

export type RouteEvent<T> = {
  subscribe(listener: (payload: T) => void): () => void;
};

export type RouteOpenedPayload<Params, Query> = {
  params: Params;
  query: Query;
  path: string;
  fullPath: string;
};

export type GoOptions<Query> = {
  query?: Query;
  replace?: boolean;
};

/** @deprecated Use GoOptions */
export type OpenOptions<Query> = GoOptions<Query>;

export type NamedRoute<
  Name extends string,
  Params = Record<string, never>,
  Query = Record<string, never>,
> = Route<Params, Query> & { readonly name: Name };

export type NamedPage<
  Name extends string,
  Params = Record<string, never>,
  Query = Record<string, never>,
  Data = void,
> = Page<Params, Query, Data> & { readonly name: Name };

export type Route<Params = Record<string, never>, Query = Record<string, never>> = {
  readonly name?: string;
  readonly $isOpened: ReadonlySignal<boolean>;
  readonly $params: ReadonlySignal<Params | null>;
  readonly $query: ReadonlySignal<Query>;
  readonly $path: ReadonlySignal<string | null>;
  readonly $fullPath: ReadonlySignal<string | null>;
  go(
    ...args: keyof Params extends never
      ? [params?: Params, options?: GoOptions<Query>]
      : [params: Params, options?: GoOptions<Query>]
  ): void;
  /** @deprecated Alias for `go()` */
  open(
    ...args: keyof Params extends never
      ? [params?: Params, options?: GoOptions<Query>]
      : [params: Params, options?: GoOptions<Query>]
  ): void;
  close(): void;
  readonly opened: RouteEvent<RouteOpenedPayload<Params, Query>>;
  readonly closed: RouteEvent<void>;
};

export type PageLoaderContext<Params, Query> = {
  params: Params;
  query: Query;
  navigationId?: number;
};

export type RouteViewContext<
  Params = Record<string, unknown>,
  Query = Record<string, unknown>,
  Data = void,
> = {
  params: Params;
  query: Query;
  outlet: () => Child;
  data: Data | null;
  /** Set when the view is used as a router-level or per-route error UI. */
  error?: unknown;
};

/** @deprecated Use RouteViewContext */
export type PageRenderContext<
  Params = Record<string, unknown>,
  Query = Record<string, unknown>,
  Data = void,
> = RouteViewContext<Params, Query, Data>;

export type RouteView<
  Params = Record<string, unknown>,
  Query = Record<string, unknown>,
  Data = void,
> = (context: RouteViewContext<Params, Query, Data>) => unknown;

/** @deprecated Use RouteView */
export type PageComponent<
  Params = Record<string, unknown>,
  Query = Record<string, unknown>,
  Data = void,
> = RouteView<Params, Query, Data>;

export type RouteLoadingView = (context: {
  params: Record<string, unknown>;
  query: Record<string, unknown>;
}) => unknown;

/** @deprecated Use RouteLoadingView */
export type PageViewComponent = RouteLoadingView;

export type RouteErrorView = (context: {
  error: unknown;
  params: Record<string, unknown>;
  query: Record<string, unknown>;
}) => unknown;

/** @deprecated Use RouteErrorView */
export type PageErrorComponent = RouteErrorView;

export type Page<
  Params = Record<string, never>,
  Query = Record<string, never>,
  Data = void,
> = Route<Params, Query> & {
  readonly $pending: ReadonlySignal<boolean>;
  readonly $error: ReadonlySignal<unknown | null>;
  readonly $data: ReadonlySignal<Data | null>;
  readonly beforeLoad?: (ctx: PageLoaderContext<Params, Query>) => Data | Promise<Data>;
  /** @deprecated Use `beforeLoad` */
  readonly loader?: (ctx: PageLoaderContext<Params, Query>) => Data | Promise<Data>;
  readonly loadingView?: RouteLoadingView;
  readonly errorView?: RouteErrorView;
  replace(
    ...args: keyof Params extends never
      ? [params?: Params, options?: GoOptions<Query>]
      : [params: Params, options?: GoOptions<Query>]
  ): void;
  resolve(params?: Params, options?: { query?: Record<string, unknown> }): string;
  isActive(): boolean;
  preload?(): void;
};

export type PageViewRenderContext<
  Params = Record<string, unknown>,
  Query = Record<string, unknown>,
> = Omit<PageRenderContext<Params, Query, void>, "data">;

/** @deprecated Use PageComponent */
export type PageViewRenderer<
  Params = Record<string, unknown>,
  Query = Record<string, unknown>,
> = (context: PageViewRenderContext<Params, Query>) => unknown;

import type { RouterHistoryConfig } from "./history-config";
import type { Child } from "@echojs-ecosystem/hyperdom";
import type {
  CollectRoutePaths,
  RouteTreeEntry,
  RouteTreeInput,
  RouteTreeNode,
} from "./path-types";

export type {
  CollectNamedRoutes,
  CollectRoutePaths,
  RouteTreeEntry,
  RouteTreeInput,
  RouteTreeNode,
  RouteTreeBranch,
  JoinPaths,
} from "./path-types";
export type {
  MemoryHistoryConfig,
  RouterHistoryConfig,
  RouterHistoryKind,
} from "./history-config";

/** @deprecated Use RouteTreeEntry */
export type RouterRouteDefinition = RouteTreeEntry;

export type {
  RouteViewConfig,
  LayoutViewConfig,
  RedirectConfig,
  RouteViewEntry,
  LayoutViewEntry,
  RedirectRouteEntry,
  PageRouteEntry,
  LayoutRouteEntry,
} from "./path-types";

export type LayoutPage = AnyPage & {
  readonly __layout?: unique symbol;
};

export type RouteConfig = {
  path: string;
  route: AnyRoute;
  children?: RouteConfig[];
};

export type RouterHistory = {
  getLocation(): string;
  push(path: string): void;
  replace(path: string): void;
  listen(callback: (path: string) => void): () => void;
  back(): void;
  forward(): void;
};

export type CreateRouterOptions<
  TRoutes extends readonly RouteTreeNode[] = readonly RouteTreeNode[],
> = {
  history: RouterHistoryConfig;
  routes: TRoutes;
  /** Route guards checked on every navigation (layout → leaf order). */
  guards?: readonly import("./guard-registry").GuardRouteOptions[];
  /** Redirect when a source route opens (replace navigation). */
  redirects?: readonly import("./redirect-registry").RedirectOptions[];
  loadingView?: RouteLoadingView | AnyPage;
  errorView?: RouteErrorView | AnyPage;
  notFoundView?: RouterNotFoundView | AnyPage;
};

export type RouterNotFoundView = (
  context: RouteViewContext<Record<string, unknown>, Record<string, unknown>, void>,
) => unknown;

/** @deprecated Use RouterNotFoundView */
export type RouterNotFoundComponent = RouterNotFoundView;

export type AnyRoute = Route<any, any>;
export type AnyPage = Page<any, any, any>;

export type RouterViewComponent = () => unknown;

/** Default shape of `router.routes` when the route tree is not inferred. */
export type RouterRoutes = Readonly<Record<string, AnyRoute>>;

export type RouterBase = {
  readonly $path: ReadonlySignal<string>;
  readonly $query: ReadonlySignal<Record<string, string>>;
  readonly $fullPath: ReadonlySignal<string>;
  readonly $activeRoute: ReadonlySignal<AnyRoute | null>;
  readonly $activePage: ReadonlySignal<AnyPage | null>;
  readonly $activeRoutes: ReadonlySignal<AnyRoute[]>;
  readonly $matched: ReadonlySignal<AnyRoute[]>;
  readonly $params: ReadonlySignal<Record<string, string>>;
  readonly $pending: ReadonlySignal<boolean>;
  readonly $error: ReadonlySignal<unknown | null>;
  readonly View: RouterViewComponent;
  start(): void;
  stop(): void;
  go(path: string, options?: { replace?: boolean }): void;
  replace(path: string): void;
  back(): void;
  forward(): void;
  reload(): void;
  resolve(
    route: AnyRoute,
    params?: Record<string, string>,
    options?: { query?: Record<string, unknown> },
  ): string;
  isActive(route: AnyRoute): boolean;
  view(): RouterViewComponent;
  closeRoute(route: AnyRoute): void;
  /** Register a guard at runtime. Prefer `createRouter({ guards })` for static rules. */
  addGuard(options: import("./guard-registry").GuardRouteOptions): () => void;
  /** Register a redirect at runtime. Prefer `createRouter({ redirects })` for static rules. */
  addRedirect(options: import("./redirect-registry").RedirectOptions): () => void;
};

export type Router<TRoutes extends RouterRoutes = RouterRoutes> = RouterBase & {
  readonly routes: TRoutes;
};

export type MatchResult = {
  matched: boolean;
  params: Record<string, string>;
};

export type ChainedRoute<Params, Query, Result = void> = {
  readonly $isOpened: ReadonlySignal<boolean>;
  readonly $pending: ReadonlySignal<boolean>;
  readonly $error: ReadonlySignal<unknown | null>;
  readonly $params: ReadonlySignal<Params | null>;
  readonly $query: ReadonlySignal<Query>;
  readonly $result: ReadonlySignal<Result | null>;
};
