---
title: API Reference
description: Public API for @echojs-ecosystem/router and @echojs-ecosystem/router/hyperdom.
package: "@echojs-ecosystem/router"
---

# API Reference

## `@echojs-ecosystem/router` (core)

### Factories

| Export | Description |
| --- | --- |
| `createRouteView(options)` | Leaf page with `view`, optional `beforeLoad`, `loadingView`, `errorView` |
| `createLayoutView(options)` | Layout page with `outlet` in view context |
| `createLazyRouteView(options)` | Code-split page; `view: () => import("…")` |
| `createRoute(name)` | Named route object without UI (redirects/guards) |
| `createRoutes(config)` | Build typed route tree + `router.routes` map |
| `createRouter(options)` | Core router factory (use hyperdom wrapper in apps) |

### Operators

| Export | Description |
| --- | --- |
| `redirect(options)` | Redirect route helper |
| `guardRoute(options)` | Guard wrapper |
| `chainRoute(options)` | `beforeOpen` hook chain |

### Path & query

| Export | Description |
| --- | --- |
| `matchPath`, `buildPath`, `normalizePathname` | Path utilities |
| `splitLocation`, `joinLocation`, `joinRoutePaths` | URL helpers |
| `parseQuery`, `stringifyQuery`, `parseQueryValues` | Query parsing |
| `flattenRouteTree`, `matchRouteChain` | Matching internals (also public) |
| `buildNamedRoutes` | Flatten tree to named map |

### History

| Export | Description |
| --- | --- |
| `createBrowserHistory()` | `pushState` / `popstate` |
| `createHashHistory()` | Hash-based |
| `createMemoryHistory()` | In-memory stack |
| `resolveHistory(config)` | Normalize `history` option |

### Page helpers

| Export | Description |
| --- | --- |
| `isPage(route)` | Type guard |
| `isLayoutPage(route)` | Layout guard |
| `assertPage(route)` | Throws if not a page instance |
| `isLazyRouteView(page)` | Lazy page guard |

### Types (selected)

`Route`, `Page`, `LayoutPage`, `AnyPage`, `Router`, `RouterRoutes`, `RouteView`, `RouteViewContext`, `BeforeLoadContext`, `AuthorizationGuardOptions`, `CreateRouterOptions`, `GoOptions`, `RouteTreeBranch`, …

## `@echojs-ecosystem/router/hyperdom`

| Export | Description |
| --- | --- |
| `createRouter(options)` | `Router` + `View: () => Child` + `createQueryParams` |
| `createRouterProvider(router, opts?)` | Echo `EchoProvider` — `resolveRoot`, auto `start()` |
| `Link(props)` | `<a>` with optional `to.go()` |
| `NavLink(props)` | `Link` + `activeClass` from `$isOpened` |
| `ROUTER_KEY` | Symbol for `app.provide` / inject |

### `createRouter` options

| Field | Type | Notes |
| --- | --- | --- |
| `routes` | `createRoutes(...)` result | Required |
| `history` | `"browser"` \| `"hash"` \| `"memory"` \| config \| `RouterHistory` | |
| `loadingView` | `RouteLoadingView` or page | Global loading |
| `errorView` | `RouteErrorView` or page | Global error |
| `notFoundView` | `RouteView` or page | Unmatched URL |
| `authorizationGuard` | See below | Auth redirects |

### `authorizationGuard`

| Field | Role |
| --- | --- |
| `isAuthorized()` | Boolean or reactive check |
| `allowedUnauthorizedPaths` | Guest-only URLs |
| `allowedAuthorizedPaths` | Optional allow-list when logged in |
| `redirectTo` | Path or `(ctx) => path` when unauthorized |
| `redirectWhenAuthorized` | After login redirect |

### Route / page instance API

Each page/route object exposes (via signals):

| Member | Description |
| --- | --- |
| `$isOpened` | Route active in current match |
| `$params` | Param record |
| `$query` | Query record |
| `$data` | `beforeLoad` result (pages) |
| `$pending` | Loading flag |
| `$error` | Error value |
| `go(params?, options?)` | Navigate to this route |
| `open(...)` | Alias of `go` |
| `close()` | Close route (legacy routes) |
| `preload()` | Lazy: load chunk + beforeLoad |

### Router instance

| Member | Description |
| --- | --- |
| `start()` / `stop()` | History listeners |
| `go(path, { replace? })` | Navigate by path string |
| `replace(path)` | `go` with replace |
| `back()` / `forward()` | History |
| `reload()` | Re-sync current URL |
| `resolve(route, params?, { query? })` | Build URL string |
| `isActive(route)` | Whether route is in active chain |
| `View` / `view()` | HyperDOM root render fn |
| `routes` | Named route map from tree |
| `$path`, `$query`, `$fullPath`, `$activePage`, `$activeRoutes`, `$matched`, `$params`, `$pending`, `$error` | Reactive state |

### `Link` / `NavLink` props

| Prop | Type |
| --- | --- |
| `to` | Route object (typed params) |
| `href` | string (bypasses `to`) |
| `params` | Param record |
| `query` | Query record |
| `replace` | boolean |
| `children` | HyperDOM `Child` |
| `activeClass` | NavLink only — class when active |
| `class` | NavLink — base class |

## Route config shapes (`createRoutes`)

| Entry | Keys |
| --- | --- |
| Page | `{ path, name, routeView }` |
| Layout | `{ path, name, layoutView, children }` |
| Redirect/guard | `{ path, name, route }` — `route` from operators |

## Limitations (v0)

- No file-based routing generator
- No async guard cancellation
- Simple 404 via `notFoundView`
- `List`-style keyed route animation — N/A here; lazy chunks cached only

## Related

- Usage — `/docs/packages/router/usage`
- Overview — `/docs/packages/router`
