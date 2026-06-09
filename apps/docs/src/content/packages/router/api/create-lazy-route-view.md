---
title: createLazyRouteView
description: Code-split page — `view: () => import("./page")`.
package: '@echojs-ecosystem/router'
keywords: [createLazyRouteView, lazy, router]
---

@echojs-ecosystem/router

## Usage

```ts
import { createLazyRouteView } from '@echojs-ecosystem/router'

export const settingsPage = createLazyRouteView({
  name: 'settings',
  view: () => import('./settings.page'),
  beforeLoad: () => loadSettings(),
})
```

## Type Declarations

```ts
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
```

## API

### Returns

`createLazyRouteView` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| lazy page | `NamedPage` | Same API as `createRouteView` + dynamic import |
| `preload()` | method | Load chunk and run `beforeLoad` |

### Related

- [createRouteView](/docs/packages/router/api/create-route-view)
