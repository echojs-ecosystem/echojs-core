---
title: Route Views
description:
  createRouteView, createLayoutView, createLazyRouteView, createRoute, and page
  instance API.
package: '@echojs-ecosystem/router'
---

# Route Views

## Factories

| Export                         | Description                                                              |
| ------------------------------ | ------------------------------------------------------------------------ |
| `createRouteView(options)`     | Leaf page with `view`, optional `beforeLoad`, `loadingView`, `errorView` |
| `createLayoutView(options)`    | Layout page with `outlet` in view context                                |
| `createLazyRouteView(options)` | Code-split page; `view: () => import("…")`                               |
| `createRoute(name)`            | Named route object without UI (redirects/guards)                         |

## Page helpers

| Export                  | Description                   |
| ----------------------- | ----------------------------- |
| `isPage(route)`         | Type guard                    |
| `isLayoutPage(route)`   | Layout guard                  |
| `assertPage(route)`     | Throws if not a page instance |
| `isLazyRouteView(page)` | Lazy page guard               |

## Page instance API

Each page/route object exposes (via signals):

| Member                  | Description                   |
| ----------------------- | ----------------------------- |
| `$isOpened`             | Route active in current match |
| `$params`               | Param record                  |
| `$query`                | Query record                  |
| `$data`                 | `beforeLoad` result (pages)   |
| `$pending`              | Loading flag                  |
| `$error`                | Error value                   |
| `go(params?, options?)` | Navigate to this route        |
| `open(...)`             | Alias of `go`                 |
| `close()`               | Close route (legacy routes)   |
| `preload()`             | Lazy: load chunk + beforeLoad |

## Route config shapes (`createRoutes`)

| Entry          | Keys                                             |
| -------------- | ------------------------------------------------ |
| Page           | `{ path, name, routeView }`                      |
| Layout         | `{ path, name, layoutView, children }`           |
| Redirect/guard | `{ path, name, route }` — `route` from operators |

## Related

- [Route Trees guide](/docs/packages/router/guides/route-trees)
- [Lazy Routes guide](/docs/packages/router/guides/lazy-routes)
