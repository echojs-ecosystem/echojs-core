---
title: Router
description:
  Typed SPA routing with signal-backed route state and HyperDOM integration.
package: '@echojs-ecosystem/router'
keywords: [createRouter, NavLink, createRouteView, guards]
---

:::package-overview router

:::install @echojs-ecosystem/router

## Key APIs

| Export | Role |
| ------ | ---- |
| [`createRoutes`](/docs/packages/router/api/create-routes) | Declarative route tree with layouts and children |
| [`createRouter`](/docs/packages/router/api/create-router) | Router instance — navigation, matching, outlets |
| [`createRouteView`](/docs/packages/router/api/create-route-view) | Leaf page bound to a route |
| [`createLayoutView`](/docs/packages/router/api/create-layout-view) | Shared chrome with nested `<Outlet />` |
| [`NavLink`](/docs/packages/router/api/nav-link) | Active-aware links for sidebars and tabs |
| [`guardRoute`](/docs/packages/router/api/guard-route) | Redirect or block navigation before enter |

## Common patterns

- **`beforeLoad`** on a route loads data into `$data` before the view renders —
  pair with `@echojs-ecosystem/async` queries inside models.
- **Layouts** nest via `layoutView` + `children`; only the active leaf renders
  through the outlet chain.
- **Search params** (`?q=…`) belong in `@echojs-ecosystem/url-state`, not
  path params.

> [!tip] Start with [Route Trees](/docs/packages/router/guides/route-trees), then
> [Page + Layout example](/docs/packages/router/examples/page-and-layout).

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Installation](/docs/packages/router/installation) | Package install |
| [Functions](/docs/packages/router/functions) | Full index by category — links to each API page |
| [Guides & Concepts](/docs/packages/router/guides/route-trees) | Route trees, navigation, guards |

Each API page follows: **Usage** → **Type Declarations** → **API** (see [createRouter](/docs/packages/router/api/create-router) for the reference layout).

Search params and filters → `@echojs-ecosystem/url-state`.
