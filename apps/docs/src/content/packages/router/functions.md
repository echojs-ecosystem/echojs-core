---
title: Functions
description: Index of all @echojs-ecosystem/router exports by category.
package: '@echojs-ecosystem/router'
---

# Functions

Typed SPA routing — route trees, HyperDOM views, operators, and history adapters.

:::install @echojs-ecosystem/router

## Routes

| Export | Description |
| ------ | ----------- |
| [createRoute](/docs/packages/router/api/create-route) | Named route without UI |
| [createRoutes](/docs/packages/router/api/create-routes) | Typed route tree |
| [createRouteView](/docs/packages/router/api/create-route-view) | Leaf page |
| [createLayoutView](/docs/packages/router/api/create-layout-view) | Layout with outlet |
| [createLazyRouteView](/docs/packages/router/api/create-lazy-route-view) | Code-split page |

## Router

| Export | Description |
| ------ | ----------- |
| [createRouter](/docs/packages/router/api/create-router) | Router + HyperDOM `View` |
| [createRouterProvider](/docs/packages/router/api/create-router-provider) | `createEchoApp` provider |

## Components

| Export | Description |
| ------ | ----------- |
| [Link](/docs/packages/router/api/link) | Declarative `<a>` |
| [NavLink](/docs/packages/router/api/nav-link) | Link + active class |

## Operators

| Export | Description |
| ------ | ----------- |
| [redirect](/docs/packages/router/api/redirect) | Redirect route |
| [guardRoute](/docs/packages/router/api/guard-route) | Open guard |
| [chainRoute](/docs/packages/router/api/chain-route) | `beforeOpen` chain |

## Utilities

| Export | Description |
| ------ | ----------- |
| [Path](/docs/packages/router/api/path) | `matchPath`, `buildPath`, … |
| [Query](/docs/packages/router/api/query) | `parseQuery`, `stringifyQuery` |
| [History](/docs/packages/router/api/history) | Browser / hash / memory |
