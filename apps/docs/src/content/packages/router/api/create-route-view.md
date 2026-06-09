---
title: createRouteView
description: Define a leaf page with `view`, optional `beforeLoad`, loading and error views.
package: '@echojs-ecosystem/router'
keywords: [createRouteView, page, router]
---

@echojs-ecosystem/router

## Usage

```ts
import { createRouteView } from '@echojs-ecosystem/router'

export const docsPage = createRouteView({
  name: 'docs',
  view: ({ params, data }) => DocView({ slug: params.slug, data }),
  beforeLoad: async ({ params }) => loadDoc(params.slug),
})
```

## Type Declarations

```ts
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
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | Route name |
| `view` | `PageViewComponent` | — | HyperDOM page renderer |
| `beforeLoad` | `function` | optional | Async data before open |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `$isOpened` | `Signal<boolean>` | Route active in match |
| `$params` / `$query` | signals | Current URL state |
| `$data` | signal | `beforeLoad` result |
| `go()` / `open()` | method | Navigate to this route |
| `preload()` | method | Warm lazy chunk + beforeLoad |

### Related

- [createLayoutView](/docs/packages/router/api/create-layout-view)
- [createLazyRouteView](/docs/packages/router/api/create-lazy-route-view)
