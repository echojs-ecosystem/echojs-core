/** Doc content for @echojs-ecosystem/router API pages. */

const sig = (s) => s.trim()

export const routerApiDocs = [
  {
    slug: 'create-route',
    name: 'createRoute',
    description: 'Create a typed named route object without UI (redirects, guards).',
    keywords: ['createRoute', 'router'],
    usage: sig(`
import { createRoute } from '@echojs-ecosystem/router'

const home = createRoute('home')
const user = createRoute('user')
`),
    types: sig(`
export const createRoute: <const Name extends string>(
  name: Name,
) => NamedRoute<Name>
`),
    params: [['`name`', '`string`', '—', 'Unique route name in the tree']],
    returns: [['route', '`NamedRoute`', 'Typed route handle for `go`, `open`, signals']],
    related: ['create-routes', 'redirect'],
  },
  {
    slug: 'create-routes',
    name: 'createRoutes',
    description: 'Build a typed route tree passed to `createRouter({ routes })`.',
    keywords: ['createRoutes', 'router'],
    usage: sig(`
import { createRoutes, createRouteView } from '@echojs-ecosystem/router'

const home = createRouteView({ name: 'home', view: () => HomeView() })

export const routes = createRoutes([
  { path: '/', name: 'home', routeView: home },
  { path: '/about', name: 'about', routeView: about },
])
`),
    types: sig(`
export function createRoutes<const TRoutes extends readonly RouteTreeNode[]>(
  routes: TRoutes,
): TRoutes

export type RoutesFromConfig<TRoutes extends readonly RouteTreeNode[]> =
  CollectNamedRoutes<TRoutes>
`),
    params: [['`routes`', '`RouteTreeBranch[]`', '—', 'Page, layout, or operator entries']],
    returns: [['tree', '`TRoutes`', 'Same array — types collect named routes']],
    related: ['create-router', 'create-route-view', 'create-layout-view'],
  },
  {
    slug: 'create-route-view',
    name: 'createRouteView',
    description: 'Define a leaf page with `view`, optional `beforeLoad`, loading and error views.',
    keywords: ['createRouteView', 'page', 'router'],
    usage: sig(`
import { createRouteView } from '@echojs-ecosystem/router'

export const docsPage = createRouteView({
  name: 'docs',
  view: ({ params, data }) => DocView({ slug: params.slug, data }),
  beforeLoad: async ({ params }) => loadDoc(params.slug),
})
`),
    types: sig(`
export function createRouteView<const O extends RouteViewOptionsConstraint>(
  options: O,
): NamedPage<...>

export type CreateRouteViewOptions<Params, Query, Data> = {
  name: string
  view: PageViewComponent<Params, Query, Data>
  beforeLoad?: (ctx: BeforeLoadContext<Params, Query>) => Data | Promise<Data>
  loadingView?: RouteLoadingView
  errorView?: RouteErrorView
}
`),
    params: [
      ['`name`', '`string`', '—', 'Route name'],
      ['`view`', '`PageViewComponent`', '—', 'HyperDOM page renderer'],
      ['`beforeLoad`', '`function`', 'optional', 'Async data before open'],
    ],
    returns: [
      ['`$isOpened`', '`Signal<boolean>`', 'Route active in match'],
      ['`$params` / `$query`', 'signals', 'Current URL state'],
      ['`$data`', 'signal', '`beforeLoad` result'],
      ['`go()` / `open()`', 'method', 'Navigate to this route'],
      ['`preload()`', 'method', 'Warm lazy chunk + beforeLoad'],
    ],
    related: ['create-layout-view', 'create-lazy-route-view'],
  },
  {
    slug: 'create-layout-view',
    name: 'createLayoutView',
    description: 'Layout page that renders an `outlet` for nested child routes.',
    keywords: ['createLayoutView', 'layout', 'router'],
    usage: sig(`
import { createLayoutView } from '@echojs-ecosystem/router'

export const docsLayout = createLayoutView({
  name: 'docs-layout',
  view: ({ outlet }) => shell({ children: [sidebar(), outlet()] }),
})
`),
    types: sig(`
export const createLayoutView: <const O extends RouteViewOptionsConstraint>(
  options: O,
) => NamedLayoutView<...>

export const isLayoutPage: (route: unknown) => route is LayoutPage
`),
    returns: [
      ['layout page', '`NamedLayoutView`', 'Same signals as route view + `outlet` in view ctx'],
      ['`isLayoutPage`', 'guard', 'Detect layout instances'],
    ],
    related: ['create-route-view', 'create-routes'],
  },
  {
    slug: 'create-lazy-route-view',
    name: 'createLazyRouteView',
    description: 'Code-split page — `view: () => import("./page")`.',
    keywords: ['createLazyRouteView', 'lazy', 'router'],
    usage: sig(`
import { createLazyRouteView } from '@echojs-ecosystem/router'

export const settingsPage = createLazyRouteView({
  name: 'settings',
  view: () => import('./settings.page'),
  beforeLoad: () => loadSettings(),
})
`),
    types: sig(`
export type CreateLazyRouteViewOptions<Params, Query, Data> = {
  name?: string
  view: LazyRouteViewLoader<Params, Query, Data>
  beforeLoad?: (ctx: BeforeLoadContext<Params, Query>) => Data | Promise<Data>
  loadingView?: RouteLoadingView
  errorView?: RouteErrorView
}

export const createLazyRouteView: <const O extends LazyRouteViewOptionsConstraint>(
  options: O,
) => NamedPage<...>

export const isLazyRouteView: (page: unknown) => boolean
`),
    returns: [
      ['lazy page', '`NamedPage`', 'Same API as `createRouteView` + dynamic import'],
      ['`preload()`', 'method', 'Load chunk and run `beforeLoad`'],
    ],
    related: ['create-route-view'],
  },
  {
    slug: 'create-router',
    name: 'createRouter',
    description: 'Create a router with HyperDOM `View`, signals, and navigation API.',
    keywords: ['createRouter', 'router'],
    usage: sig(`
import { createRouter, createRoutes } from '@echojs-ecosystem/router'

export const appRouter = createRouter({
  routes,
  history: 'browser',
  notFoundView: () => NotFoundView(),
})

appRouter.start()
`),
    types: sig(`
export type HyperdomRouter<TRoutes> = Router<TRoutes> & {
  readonly View: () => Child
  createQueryParams: RouterBoundQueryParams
}

export const createRouter: <const TRoutes extends readonly RouteTreeBranch[]>(
  options: CreateRouterOptions<TRoutes>,
) => HyperdomRouter<CollectNamedRoutes<TRoutes>>

export type CreateRouterOptions<TRoutes> = {
  routes: TRoutes
  history?: RouterHistoryKind | RouterHistoryConfig | RouterHistory
  loadingView?: RouteLoadingView
  errorView?: RouteErrorView
  notFoundView?: RouterNotFoundView
  guards?: GuardRouteOptions[]
  redirects?: RedirectOptions[]
}
`),
    params: [
      ['`routes`', '`createRoutes(...)`', '—', 'Route tree'],
      ['`history`', '`browser | hash | memory | config`', '`browser`', 'History adapter'],
      ['`guards`', '`GuardRouteOptions[]`', '`[]`', 'Route protection rules'],
      ['`redirects`', '`RedirectOptions[]`', '`[]`', 'Path redirect rules'],
    ],
    returns: [
      ['`start()` / `stop()`', 'void', 'History listeners'],
      ['`go()` / `replace()`', 'void', 'Navigate by path'],
      ['`resolve()`', 'string', 'Build URL from route + params'],
      ['`$path` / `$query` / `$params`', 'signals', 'Reactive router state'],
      ['`View`', '`() => Child`', 'Root outlet for HyperDOM'],
    ],
    related: ['create-router-provider', 'create-routes'],
  },
  {
    slug: 'create-router-provider',
    name: 'createRouterProvider',
    description: 'Wire the router into `createEchoApp().use(...)`.',
    keywords: ['createRouterProvider', 'router', 'provider'],
    usage: sig(`
import { createEchoApp } from '@echojs-ecosystem/framework/app'
import { createRouterProvider } from '@echojs-ecosystem/router'

export const routerProvider = createRouterProvider(appRouter)

createEchoApp().use(routerProvider).mount('#app')
`),
    types: sig(`
export const ROUTER_KEY: unique symbol

export type RouterProvider = {
  name: 'router'
  setup: (app: RouterProviderHost) => void
  resolveRoot: () => Child
}

export const createRouterProvider: (
  router: RouterLike,
  options?: { autoStart?: boolean },
) => RouterProvider
`),
    params: [
      ['`router`', '`RouterLike`', '—', 'Router with `View`, `start`, `stop`'],
      ['`options.autoStart`', '`boolean`', '`true`', 'Call `router.start()` on mount'],
    ],
    returns: [['provider', '`RouterProvider`', 'Echo plugin with `resolveRoot`']],
    related: ['create-router', 'link'],
  },
  {
    slug: 'link',
    name: 'Link',
    description: 'HyperDOM `<a>` that navigates via a typed route or `href`.',
    keywords: ['Link', 'router', 'navigation'],
    usage: sig(`
import { Link } from '@echojs-ecosystem/router'

Link({
  to: docsPage,
  params: { slug: 'intro' },
  children: 'Introduction',
})
`),
    types: sig(`
export type LinkProps<Params, Query> = {
  to?: Route<Params, Query>
  href?: string
  params?: Params
  query?: Query
  replace?: boolean
  children?: Child
}

export const Link: <Params, Query>(props: LinkProps<Params, Query>) => Child
`),
    params: [
      ['`to`', '`Route`', 'optional', 'Typed route — prevents default + `go()`'],
      ['`href`', '`string`', 'optional', 'Plain URL when `to` omitted'],
      ['`params` / `query`', 'records', 'optional', 'Navigation payload'],
    ],
    returns: [['element', '`Child`', 'Anchor element']],
    related: ['nav-link', 'create-router-provider'],
  },
  {
    slug: 'nav-link',
    name: 'NavLink',
    description: 'Like `Link` with `activeClass` when the target route is open.',
    keywords: ['NavLink', 'router', 'navigation'],
    usage: sig(`
import { NavLink } from '@echojs-ecosystem/router'

NavLink({
  to: docsPage,
  params: { slug: 'intro' },
  class: 'nav-item',
  activeClass: 'nav-item--active',
  children: 'Introduction',
})
`),
    types: sig(`
export type NavLinkMatch = 'exact' | 'partial'

export type NavLinkProps<Params, Query> = LinkProps<Params, Query> & {
  activeClass?: string
  class?: string
  match?: NavLinkMatch
  activeOn?: readonly Route<any, any>[]
}

export const NavLink: <Params, Query>(props: NavLinkProps<Params, Query>) => Child
`),
    params: [
      ['`match`', '`exact | partial`', '`exact`', 'How to detect active state'],
      ['`activeClass`', '`string`', 'optional', 'Class when active'],
      ['`activeOn`', '`Route[]`', 'optional', 'Extra routes that mark active'],
    ],
    returns: [['element', '`Child`', 'Anchor with reactive active class']],
    related: ['link'],
  },
  {
    slug: 'redirect',
    name: 'RedirectOptions',
    description: 'Path redirects via `createRouter({ redirects })`.',
    keywords: ['redirects', 'router', 'RedirectOptions'],
    usage: sig(`
import { createRoute, createRouter } from '@echojs-ecosystem/router'

const rootRoute = createRoute('root')

export const appRedirects = [
  { from: rootRoute, to: dashboardPage },
]

createRouter({
  routes: [{ path: '/', name: 'root', route: rootRoute }, ...appRoutes],
  redirects: appRedirects,
})
`),
    types: sig(`
export type RedirectOptions<FromParams, FromQuery, ToParams, ToQuery> = {
  from: Route<FromParams, FromQuery>
  to: Route<ToParams, ToQuery>
  mapParams?: (params: FromParams) => ToParams
  mapQuery?: (query: FromQuery) => ToQuery
}
`),
    params: [
      ['`redirects`', '`RedirectOptions[]`', '`[]`', 'Redirect rules on createRouter'],
      ['`from` / `to`', '`Route`', '—', 'Source and destination routes'],
      ['`mapParams` / `mapQuery`', 'functions', 'optional', 'Transform payload'],
    ],
    returns: [['`addRedirect()`', '`() => void`', 'Runtime unregister handle']],
    related: ['guard-route', 'create-route'],
  },
  {
    slug: 'guard-route',
    name: 'GuardRouteOptions',
    description: 'Protect routes via `createRouter({ guards })`.',
    keywords: ['guards', 'router', 'GuardRouteOptions'],
    usage: sig(`
import type { GuardRouteOptions } from '@echojs-ecosystem/router'
import { createRouter } from '@echojs-ecosystem/router'

export const appGuards: GuardRouteOptions[] = [
  {
    route: adminPage,
    canOpen: () => isAdmin(),
    otherwise: loginPage,
  },
]

createRouter({ routes: appRoutes, guards: appGuards })
`),
    types: sig(`
export type GuardRouteOptions = {
  route: Route<any, any>
  canOpen: () => boolean
  otherwise: Route<any, any>
}
`),
    params: [
      ['`guards`', '`GuardRouteOptions[]`', '`[]`', 'Guard rules on createRouter'],
      ['`route`', '`Route`', '—', 'Protected route'],
      ['`canOpen`', '`() => boolean`', '—', 'Allow navigation'],
      ['`otherwise`', '`Route`', '—', 'Fallback when blocked'],
    ],
    returns: [['`addGuard()`', '`() => void`', 'Runtime unregister handle']],
    related: ['redirect', 'chain-route'],
  },
  {
    slug: 'chain-route',
    name: 'chainRoute',
    description: 'Run `beforeOpen` when a route opens; exposes result signals.',
    keywords: ['chainRoute', 'router'],
    usage: sig(`
import { chainRoute } from '@echojs-ecosystem/router'

const gated = chainRoute({
  route: checkoutPage,
  beforeOpen: async ({ params }) => validateCart(params.id),
})
`),
    types: sig(`
export type ChainRouteOptions<Params, Query, Result> = {
  route: Route<Params, Query>
  beforeOpen: (ctx: { params: Params; query: Query }) => Result | Promise<Result>
}

export const chainRoute: <Params, Query, Result>(
  options: ChainRouteOptions<Params, Query, Result>,
) => ChainedRoute<Params, Query, Result>
`),
    returns: [
      ['`$result`', 'signal', '`beforeOpen` return value'],
      ['`$pending` / `$error`', 'signals', 'Async state'],
    ],
    related: ['guard-route', 'create-route-view'],
  },
  {
    slug: 'path',
    name: 'Path',
    description: 'Path matching, building, and location helpers.',
    keywords: ['matchPath', 'buildPath', 'router'],
    usage: sig(`
import { matchPath, buildPath, joinRoutePaths } from '@echojs-ecosystem/router'

matchPath('/users/:id', '/users/42')
buildPath('/users/:id', { id: '42' })
`),
    types: sig(`
export const matchPath: (pattern: string, pathname: string) => MatchResult | null
export const buildPath: (pattern: string, params: Record<string, string>) => string
export const normalizePathname: (pathname: string) => string
export const splitLocation: (location: string) => { pathname: string; search: string; hash: string }
export const joinLocation: (parts: { pathname: string; search?: string; hash?: string }) => string
export const joinRoutePaths: (...segments: string[]) => string
export const flattenRouteTree: (...) => ...
export const matchRouteChain: (...) => ...
export const buildNamedRoutes: (...) => NamedRoutesMap
`),
    returns: [
      ['`matchPath`', '`MatchResult | null`', 'Match pattern to pathname'],
      ['`buildPath`', '`string`', 'Interpolate params into pattern'],
      ['`buildNamedRoutes`', 'map', 'Flatten tree to named routes'],
    ],
    related: ['query', 'create-routes'],
  },
  {
    slug: 'query',
    name: 'Query',
    description: 'Parse and stringify URL search params (arrays as repeated keys).',
    keywords: ['parseQuery', 'stringifyQuery', 'router'],
    usage: sig(`
import { parseQuery, stringifyQuery } from '@echojs-ecosystem/router'

const q = parseQuery('?tag=a&tag=b')
stringifyQuery({ tag: ['a', 'b'] })
`),
    types: sig(`
export const parseQuery: (search: string) => Record<string, string | string[]>
export const stringifyQuery: (query: Record<string, unknown>) => string
export const parseQueryValues: (search: string) => Record<string, unknown>
`),
    returns: [
      ['`parseQuery`', 'record', 'Query object from `?…` string'],
      ['`stringifyQuery`', 'string', 'Build search string'],
    ],
    related: ['path', 'create-route-view'],
  },
  {
    slug: 'history',
    name: 'History',
    description: 'Browser, hash, and memory history adapters for `createRouter`.',
    keywords: ['createBrowserHistory', 'router'],
    usage: sig(`
import { createRouter, createBrowserHistory } from '@echojs-ecosystem/router'

createRouter({
  routes,
  history: createBrowserHistory(),
})

// or shorthand:
createRouter({ routes, history: 'browser' })
`),
    types: sig(`
export type RouterHistoryKind = 'browser' | 'hash' | 'memory'

export const createBrowserHistory: () => RouterHistory
export const createHashHistory: () => RouterHistory
export const createMemoryHistory: (options?: MemoryHistoryConfig) => RouterHistory
export const resolveHistory: (
  config: RouterHistoryKind | RouterHistoryConfig | RouterHistory,
) => RouterHistory
`),
    params: [
      ['`history` option', '`kind | config | RouterHistory`', '`browser`', 'Passed to `createRouter`'],
    ],
    returns: [
      ['`createBrowserHistory`', '`RouterHistory`', 'pushState / popstate'],
      ['`createHashHistory`', '`RouterHistory`', 'Hash-based URLs'],
      ['`createMemoryHistory`', '`RouterHistory`', 'In-memory stack for tests'],
    ],
    related: ['create-router', 'path'],
  },
]
