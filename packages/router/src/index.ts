export { createRoute } from "./core/create-route.js";
export { createRouteView } from "./core/create-route-view.js";
export { createLazyRouteView } from "./core/create-lazy-route-view.js";
export { isLazyRouteView } from "./core/lazy-view.js";
export { createLayoutView, isLayoutPage } from "./core/create-layout-view.js";
export type { NamedLayoutView } from "./core/create-layout-view.js";
export { createRouter } from "./core/create-router.js";
export { createRoutes } from "./core/create-routes.js";
export type { RoutesFromConfig } from "./core/create-routes.js";
export { resolveHistory } from "./core/history-config.js";
export { isPage, assertPage } from "./core/page.js";
export { matchPath, buildPath, normalizePathname, splitLocation, joinLocation, joinRoutePaths } from "./core/path.js";
export { flattenRouteTree, matchRouteChain } from "./core/route-tree.js";
export { buildNamedRoutes } from "./core/build-named-routes.js";
export type { NamedRoutesMap } from "./core/build-named-routes.js";
export { parseQuery, stringifyQuery, parseQueryValues } from "./core/query.js";
export type { CreateRouteViewOptions, BeforeLoadContext } from "./core/page.js";
export type { CreateLazyRouteViewOptions } from "./core/create-lazy-route-view.js";
export type {
  LazyRouteViewLoader,
  LazyRouteViewModule,
} from "./core/lazy-view.js";
export type {
  Route,
  NamedRoute,
  Page,
  NamedPage,
  Router,
  RouterViewComponent,
  RouterHistory,
  RouteConfig,
  RouterRouteDefinition,
  RouteTreeEntry,
  RouteTreeNode,
  RouteViewConfig,
  LayoutViewConfig,
  RedirectConfig,
  RouteTreeInput,
  RouteTreeBranch,
  RouteViewEntry,
  LayoutViewEntry,
  RedirectRouteEntry,
  PageRouteEntry,
  LayoutRouteEntry,
  LayoutPage,
  RouterHistoryConfig,
  RouterHistoryKind,
  MemoryHistoryConfig,
  CollectNamedRoutes,
  CollectRoutePaths,
  JoinPaths,
  RouterBase,
  CreateRouterOptions,
  AuthorizationGuardOptions,
  AuthorizationGuardRedirect,
  AuthorizationGuardRedirectTarget,
  AuthorizationGuardRedirectContext,
  RouteEvent,
  RouteOpenedPayload,
  GoOptions,
  OpenOptions,
  RouterRoutes,
  MatchResult,
  ChainedRoute,
  PageLoaderContext,
  RouteView,
  RouteLoadingView,
  RouteErrorView,
  RouteViewContext,
  RouterNotFoundView,
  PageViewComponent,
  PageComponent,
  RouterNotFoundComponent,
  PageRenderContext,
  PageViewRenderer,
  PageErrorComponent,
  AnyPage,
} from "./core/types.js";

export { createBrowserHistory } from "./histories/browser-history.js";
export { createMemoryHistory } from "./histories/memory-history.js";
export { createHashHistory } from "./histories/hash-history.js";

export { guardRoute } from "./operators/guard.js";
export type { GuardRouteOptions } from "./operators/guard.js";
export { redirect } from "./operators/redirect.js";
export type { RedirectOptions } from "./operators/redirect.js";
export { chainRoute } from "./operators/chain-route.js";
export type { ChainRouteOptions } from "./operators/chain-route.js";
