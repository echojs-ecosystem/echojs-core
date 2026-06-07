---
title: Router Lifecycle
description:
  createRouter, start/stop, global loading priority, and reactive router state.
package: '@echojs-ecosystem/router'
---

# Router Lifecycle

Create the router with `createRouter`, start history listeners, and navigate
imperatively or via page objects.

## createRouter

```ts
import { createRouter } from '@echojs-ecosystem/router/hyperdom'

const router = createRouter({
  history: 'browser',
  routes: appRoutes,
  loadingView: globalLoading,
  errorView: globalError,
  notFoundView: notFound,
  authorizationGuard: {
    isAuthorized: () => $session.value() != null,
    allowedUnauthorizedPaths: ['/', '/login'],
    redirectTo: '/login',
    redirectWhenAuthorized: '/',
  },
})

router.start() // listen to history / apply initial URL
router.go('/users/42?tab=posts')
router.stop() // teardown
```

## Global UI priority

When a page is loading or errors:

1. Page's own `loadingView` / `errorView`
2. Nearest parent **layout** view
3. Router-level `loadingView` / `errorView`

## Router instance signals

| Member                                                                                                      | Description                      |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `start()` / `stop()`                                                                                        | History listeners                |
| `go(path, { replace? })`                                                                                    | Navigate by path string          |
| `replace(path)`                                                                                             | `go` with replace                |
| `back()` / `forward()`                                                                                      | History                          |
| `reload()`                                                                                                  | Re-sync current URL              |
| `resolve(route, params?, { query? })`                                                                       | Build URL string                 |
| `isActive(route)`                                                                                           | Whether route is in active chain |
| `View` / `view()`                                                                                           | HyperDOM root render fn          |
| `routes`                                                                                                    | Named route map from tree        |
| `$path`, `$query`, `$fullPath`, `$activePage`, `$activeRoutes`, `$matched`, `$params`, `$pending`, `$error` | Reactive state                   |

Access pending/error via `router.$pending`, `router.$error`, or page state in
views.

## Related

- [Navigation](/docs/packages/router/guides/navigation)
- [Guards & Redirects](/docs/packages/router/guides/guards-and-redirects)
