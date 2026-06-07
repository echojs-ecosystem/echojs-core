---
title: Route Trees & Layouts
description: createRoutes, path rules, layouts, and page view context.
package: '@echojs-ecosystem/router'
---

# Route Trees & Layouts

Build typed route trees with `createRoutes`, leaf pages with `createRouteView`,
and nested shells with `createLayoutView`.

## Route tree

```ts
import {
  createRoutes,
  createRouteView,
  createLayoutView,
} from '@echojs-ecosystem/router'

const shellLayout = createLayoutView({
  name: 'app-shell',
  view: ({ outlet }) => AppShell(outlet()),
})

const homePage = createRouteView({
  name: 'home',
  view: () => bindModelView(createHomeModel, HomeView),
})

const userPage = createRouteView({
  name: 'user',
  view: ({ params, data, outlet }) => UserView(params, data, outlet()),
  beforeLoad: async ({ params, query, navigationId }) => {
    return fetchUser(params.id)
  },
  loadingView: () => RouterLoading(),
  errorView: ({ error }) => RouterError(error),
})

export const appRoutes = createRoutes([
  {
    path: '/',
    name: 'root',
    layoutView: shellLayout,
    children: [
      { path: '/', name: 'home', routeView: homePage },
      { path: 'users/:id', name: 'user', routeView: userPage },
    ],
  },
])
```

## Path rules

- Leading `/` on root segment; children use **relative** segments (`users/:id`)
- Dynamic segments: `:param`
- Trailing `*` splats supported (see API)

Each `name` must be unique — used for `router.routes.home` style maps.

## Page view context

```ts
createRouteView({
  name: 'dashboard',
  view: ({ params, query, data, outlet }) => {
    // params — route params object (signals on page.$params too)
    // query — parsed query record
    // data — result of beforeLoad (page.$data)
    // outlet — () => Child for nested child route (layouts only)
    return DashboardView(data)
  },
})
```

## Layouts must render `outlet()`

```ts
createLayoutView({
  name: 'docs-shell',
  view: ({ outlet }) => DocsChrome(outlet()),
})
```

In `apps/docs`, chrome may live outside `router.View` — layout can be
pass-through `outlet()` only.

## Docs site pattern

`apps/docs` maps markdown `contentId` to paths:

```ts
{ path: "guides/routing", name: "docs-guides-routing", routeView: getDocPage("guides/routing") }
```

Single source in `core/content/nav.ts` + `canonicalDocsRouteItems()` for deduped
routes.

## Related

- [beforeLoad & Route Data](/docs/packages/router/guides/before-load)
- [Docs Dynamic Routes example](/docs/packages/router/examples/docs-routes)
