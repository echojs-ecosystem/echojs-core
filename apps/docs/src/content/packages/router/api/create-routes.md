---
title: createRoutes
description: Build a typed route tree passed to `createRouter({ routes })`.
package: '@echojs-ecosystem/router'
keywords: [createRoutes, router]
---

@echojs-ecosystem/router

## Usage

```ts
import { createRoutes, createRouteView } from '@echojs-ecosystem/router'

const home = createRouteView({ name: 'home', view: () => HomeView() })

export const routes = createRoutes([
  { path: '/', name: 'home', routeView: home },
  { path: '/about', name: 'about', routeView: about },
])
```

## Type Declarations

```ts
export function createRoutes<const TRoutes extends readonly RouteTreeNode[]>(
  routes: TRoutes,
): TRoutes

export type RoutesFromConfig<TRoutes extends readonly RouteTreeNode[]> =
  CollectNamedRoutes<TRoutes>
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `routes` | `RouteTreeBranch[]` | — | Page, layout, or operator entries |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| tree | `TRoutes` | Same array — types collect named routes |

### Related

- [createRouter](/docs/packages/router/api/create-router)
- [createRouteView](/docs/packages/router/api/create-route-view)
- [createLayoutView](/docs/packages/router/api/create-layout-view)
