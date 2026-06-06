---
title: createRoutes & createRouter
description: createRoutes, createRouter options, authorizationGuard, and router instance.
package: "@echojs-ecosystem/router"
---

# createRoutes & createRouter

## createRoutes

```ts
function createRoutes(config: RouteTreeBranch[]): RouterRoutes
```

Build typed route tree + `router.routes` map. Each branch `name` must be unique.

## createRouter (core)

```ts
function createRouter(options: CreateRouterOptions): Router
```

Use `@echojs-ecosystem/router/hyperdom` in apps for HyperDOM `View` integration.

### Options

| Field | Type | Notes |
| --- | --- | --- |
| `routes` | `createRoutes(...)` result | Required |
| `history` | `"browser"` \| `"hash"` \| `"memory"` \| config \| `RouterHistory` | |
| `loadingView` | `RouteLoadingView` or page | Global loading |
| `errorView` | `RouteErrorView` or page | Global error |
| `notFoundView` | `RouteView` or page | Unmatched URL |
| `authorizationGuard` | See below | Auth redirects |

### authorizationGuard

| Field | Role |
| --- | --- |
| `isAuthorized()` | Boolean or reactive check |
| `allowedUnauthorizedPaths` | Guest-only URLs |
| `allowedAuthorizedPaths` | Optional allow-list when logged in |
| `redirectTo` | Path or `(ctx) => path` when unauthorized |
| `redirectWhenAuthorized` | After login redirect |

## Router instance

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

## Related

- [Router Lifecycle guide](/docs/packages/router/guides/router-lifecycle)
- [Guards & Redirects guide](/docs/packages/router/guides/guards-and-redirects)
