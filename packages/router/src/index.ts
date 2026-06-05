export { createRoute } from "./core/create-route";
export { createRouteView } from "./core/create-route-view";
export { createLazyRouteView } from "./core/create-lazy-route-view";
export { isLazyRouteView } from "./core/lazy-view";
export { createLayoutView, isLayoutPage } from "./core/create-layout-view";
export type { NamedLayoutView } from "./core/create-layout-view";
export { createRouter as createRouterCore } from "./core/create-router";
export { createRouter } from "./hyperdom/create-router";
export type { HyperdomRouter } from "./hyperdom/create-router";
export { Link } from "./hyperdom/Link";
export type { LinkProps } from "./hyperdom/Link";
export { NavLink } from "./hyperdom/NavLink";
export type { NavLinkProps } from "./hyperdom/NavLink";
export {
  createRouterProvider,
  routerPlugin,
  isRouterLike,
  ROUTER_KEY,
  type RouterLike,
  type RouterProvider,
  type RouterPlugin,
} from "./plugin/router-plugin";
export { createRoutes } from "./core/create-routes";
export type { RoutesFromConfig } from "./core/create-routes";
export { resolveHistory } from "./core/history-config";
export { isPage, assertPage } from "./core/page";
export { matchPath, buildPath, normalizePathname, splitLocation, joinLocation, joinRoutePaths } from "./core/path";
export { flattenRouteTree, matchRouteChain } from "./core/route-tree";
export { buildNamedRoutes } from "./core/build-named-routes";
export type { NamedRoutesMap } from "./core/build-named-routes";
export { parseQuery, stringifyQuery, parseQueryValues } from "./core/query";
export type { CreateRouteViewOptions, BeforeLoadContext } from "./core/page";
export type { CreateLazyRouteViewOptions } from "./core/create-lazy-route-view";
export type {
  LazyRouteViewLoader,
  LazyRouteViewModule,
} from "./core/lazy-view";
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
} from "./core/types";

export { createBrowserHistory } from "./histories/browser-history";
export { createMemoryHistory } from "./histories/memory-history";
export { createHashHistory } from "./histories/hash-history";

export { guardRoute } from "./operators/guard";
export type { GuardRouteOptions } from "./operators/guard";
export { redirect } from "./operators/redirect";
export type { RedirectOptions } from "./operators/redirect";
export { chainRoute } from "./operators/chain-route";
export type { ChainRouteOptions } from "./operators/chain-route";
