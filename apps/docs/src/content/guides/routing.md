---
title: Routing
description:
  SPA navigation with route trees, layouts, beforeLoad, guards, and NavLink —
  end-to-end patterns.
keywords: [router, routes, NavLink, beforeLoad, layout, guard]
---

# Routing

EchoJS routing lives in `@echojs-ecosystem/router`: a typed route tree,
signal-driven URL state, and HyperDOM helpers (`NavLink`, `Link`). URLs decide
which page renders; route objects expose **`$params`**, **`$query`**, and
**`$isOpened`** as signals.

> [!TIP] New to signals? Start with [Reactivity](/docs/guides/reactivity) — route
> state uses the same `.value()` tracking as models.

Package reference: [Router guides](/docs/packages/router/guides/route-trees).

## Mental model

| Piece                                  | Role                                               |
| -------------------------------------- | -------------------------------------------------- |
| `createRoutes`                         | Declarative tree: paths, layouts, pages            |
| `createRouteView` / `createLayoutView` | Page UI + optional `beforeLoad`                    |
| `createRouter`                         | History, global loading/error, optional auth guard |
| `routerProvider`                       | Starts router and mounts `router.View` at app root |
| Route page object                      | `go()`, `$params`, `$query`, `$data`, `$isOpened`  |

Layouts wrap children and must call `outlet()` where nested pages appear.

## Minimal app

```ts
// entities/__routes__/app.routes.ts
import { createRoutes } from '@echojs-ecosystem/router'
import { homePage } from '@pages/home/home.page.js'

export const appRoutes = createRoutes([
  { path: '/', name: 'home', routeView: homePage },
])
```

```ts
// entities/__routes__/router.ts
import { createRouter } from '@echojs-ecosystem/router/hyperdom'
import { appRoutes } from './app.routes.js'

export const appRouter = createRouter({
  history: 'browser',
  routes: appRoutes,
  notFoundView: () => NotFound(),
})
```

Register once via `createRouterProvider(appRouter)` in bootstrap — see
[First Application](/docs/getting-started/first-application).

## Layouts and nested routes

Use a layout when several pages share chrome (sidebar, tabs, auth shell):

```ts
const appShell = createLayoutView({
  name: 'app-shell',
  view: ({ outlet }) => AppChrome(outlet()),
})

export const appRoutes = createRoutes([
  {
    path: '/',
    name: 'root',
    layoutView: appShell,
    children: [
      { path: '/', name: 'home', routeView: homePage },
      { path: 'settings', name: 'settings', routeView: settingsPage },
    ],
  },
])
```

Path rules:

- Root segment uses a leading `/` (`"/"`).
- Children use **relative** segments (`"settings"`, `"users/:id"`).
- Dynamic params: `:id`; splats: trailing `*`.

> [!RECOMMENDATION] Keep route definitions in `entities/__routes__/` and page
> factories in `pages/**` — matches
> [Project Structure](/docs/getting-started/project-structure).

## Pages and `bindModelView`

Typical page export:

```ts
import { createRouteView } from '@echojs-ecosystem/router'
import { bindModelView } from '@core/ui/bind-model-view.js'
import { createSettingsModel } from './model/settings.model.js'
import { SettingsView } from './ui/settings.view.js'

export const settingsPage = createRouteView({
  name: 'settings',
  view: () => bindModelView(createSettingsModel, SettingsView),
})
```

The route `view` is a HyperDOM child factory — no JSX, no hooks.

## Route objects as links

Pass **page objects** to `NavLink`, not string paths — refactors stay safe and
types flow through params:

```ts
import { NavLink } from '@echojs-ecosystem/router/hyperdom'

NavLink({
  to: userPage,
  params: { id: '42' },
  query: { tab: 'posts' },
  class: 'nav-item',
  activeClass: 'nav-item--active',
  children: 'Profile',
})
```

`activeClass` applies when `userPage.$isOpened.value()` is true (including
partial matches if configured on the route).

## Imperative navigation

```ts
settingsPage.go()
userPage.go({ id: '42' }, { query: { tab: 'posts' }, replace: true })
history.back() // prefer page.go() for typed targets
```

`replace: true` swaps the current history entry — useful for redirects after
login or filter-only URL tweaks.

## Params and query in models

Route signals work like any other reactive source — read `.value()` inside
models, computeds, or query `.with()`:

```ts
export const createUserModel = createModel(
  (props: { userId: string }): UserVM => {
    const profile = getUserQuery.with(() => ({ id: props.userId }))
    return {
      name: () => profile.data()?.name ?? '',
      isLoading: () => profile.isPending(),
    }
  },
  'UserModel'
)

// Page wires route params into the model:
export const userPage = createRouteView({
  name: 'user',
  view: ({ params }) =>
    bindModelView(() => createUserModel({ userId: params.id }), UserView),
})
```

For shareable UI state (filters, tabs), prefer
[URL state](/docs/packages/url-state) instead of duplicating query in a local
signal.

## `beforeLoad` and route data

Load data **before** the page paints — not inside the view:

```ts
export const userPage = createRouteView({
  name: 'user',
  view: ({ data }) => bindModelView(() => createUserModel(data), UserView),
  beforeLoad: async ({ params }) => loadUserProfile(params.id),
  loadingView: () => RouteSpinner(),
  errorView: ({ error }) => RouteError(error),
})
```

- Result is available as `data` in `view` and on `page.$data`.
- Layout `beforeLoad` runs **before** child routes; a failing layout blocks
  children.
- Loading/error UI priority: page → parent layout → router globals.

Combine with Query when the same resource is cached across pages — see
[Data fetching](/docs/guides/data-fetching#beforeload-vs-query).

Reference: `apps/example` → `workspace/users/user-detail.page.ts`,
`workspace/slow` for delayed loaders.

## Guards

### Per-route (`guardRoute`)

```ts
import { guardRoute } from '@echojs-ecosystem/router'
import { $isLoggedIn } from '@entities/session/index.js'
import { authLoginPage } from '@pages/auth/login/auth-login.page.js'
import { settingsPage } from '@pages/workspace/settings/workspace-settings.page.js'

guardRoute({
  route: settingsPage,
  canOpen: () => $isLoggedIn.value(),
  otherwise: authLoginPage,
})
```

Import guard modules from `entities/__routes__/guards.ts` so they run at startup
(`apps/example` pattern).

### Global (`authorizationGuard`)

On `createRouter`:

```ts
createRouter({
  routes: appRoutes,
  authorizationGuard: {
    isAuthorized: () => authTokenStore.value() != null,
    allowedUnauthorizedPaths: ['/', '/auth/login'],
    redirectTo: '/auth/login',
    redirectWhenAuthorized: '/',
  },
})
```

Use **global** guard for “whole app behind login”; use **`guardRoute`** for a few
protected pages.

## Lazy routes

```ts
import { createLazyRouteView } from '@echojs-ecosystem/router'

export const reportsPage = createLazyRouteView({
  name: 'reports',
  view: () => import('./reports.page.js'),
  loadingView: () => 'Loading…',
})
```

Chunk default export must be a `RouteView`. Call `reportsPage.preload()` to warm
the chunk on hover.

## Docs site pattern

`apps/docs` generates one route per markdown `contentId` and keeps nav in
`core/content/nav/`:

```ts
const docChildren = canonicalDocsRouteItems().map((item) => ({
  path: item.contentId,
  name: item.routeName,
  routeView: getDocPage(item.contentId),
}))
```

Blog and changelog nest under `/docs` with section routes — same layout shell,
different `createRouteView` trees. Shell chrome can sit **outside**
`router.View` with a pass-through layout — see
[Providers](/docs/architecture/providers).

## Prefetch and scroll

- **Prefetch queries** in `beforeLoad` when the next page always needs the same
  cache key — `queryClient.prefetchQuery(...)` (Query package).
- **Scroll restoration** — configure on `createRouter` history; reset scroll on
  `page.go()` when switching major sections.

## Checklist for new routes

1. Page factory in `pages/**` — `createRouteView` + model/view bind.
2. Entry in `entities/__routes__/app.routes.ts` (or feature route module).
3. Nav link via `NavLink({ to: page })` — no hard-coded path strings in widgets.
4. Async data — `beforeLoad` and/or `createQuery` per
   [Data fetching](/docs/guides/data-fetching).
5. Protected? — `guardRoute` or global `authorizationGuard`.

## Related

- [Routing best practices](/docs/best-practices/routing) — decisions, mobile nav, model lifetime
- [Reactivity](/docs/guides/reactivity) — signals, models, route `$params`
- [Router package](/docs/packages/router) — installation, API, playground
- [Authentication](/docs/guides/authentication) — session + guards
- [Data fetching](/docs/guides/data-fetching) — `beforeLoad` vs query
- [URL state](/docs/state/url-state) — query params as signals
- Example app — `apps/example/src/entities/__routes__/`
