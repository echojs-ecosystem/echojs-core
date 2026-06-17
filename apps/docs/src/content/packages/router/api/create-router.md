---
title: createRouter
description: Create a router with HyperDOM `View`, signals, and navigation API.
package: '@echojs-ecosystem/router'
keywords: [createRouter, router]
---

@echojs-ecosystem/router

## Usage

```ts
import { createRouter, createRoutes } from '@echojs-ecosystem/router'

export const appRouter = createRouter({
  routes,
  history: 'browser',
  notFoundView: () => NotFoundView(),
})

appRouter.start()
```

## Type Declarations

```ts
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
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `routes` | `createRoutes(...)` | — | Route tree |
| `history` | `browser \| hash \| memory \| config` | `browser` | History adapter |
| `guards` | `GuardRouteOptions[]` | `[]` | Route protection rules |
| `redirects` | `RedirectOptions[]` | `[]` | Path redirect rules |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `start()` / `stop()` | void | History listeners |
| `go()` / `replace()` | void | Navigate by path |
| `resolve()` | string | Build URL from route + params |
| `$path` / `$query` / `$params` | signals | Reactive router state |
| `View` | `() => Child` | Root outlet for HyperDOM |

### Related

- [createRouterProvider](/docs/packages/router/api/create-router-provider)
- [createRoutes](/docs/packages/router/api/create-routes)
