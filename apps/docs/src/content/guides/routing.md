---
title: Routing
description: SPA navigation with route trees, layouts, beforeLoad, guards, and NavLink — end-to-end patterns.
keywords: [router, routes, NavLink, beforeLoad, layout, guard]
---

# Routing

EchoJS routing lives in `@echojs-ecosystem/router`: a typed route tree, signal-driven URL state, and HyperDOM helpers (`NavLink`, `Link`). This guide focuses on **how to structure routes in a real app**; package details are in [Router guides](/docs/packages/router/guides/route-trees).

## Mental model

| Piece | Role |
| --- | --- |
| `createRoutes` | Declarative tree: paths, layouts, pages |
| `createRouteView` / `createLayoutView` | Page UI + optional `beforeLoad` |
| `createRouter` | History, global loading/error, optional auth guard |
| `routerProvider` | Starts router and mounts `router.View` at app root |

URLs drive which **route view** renders. Layouts wrap children and must call `outlet()` where nested pages appear.

## Minimal app

```ts
// entities/__routes__/app.routes.ts
import { createRoutes } from "@echojs-ecosystem/router";
import { homePage } from "@pages/home/home.page.js";

export const appRoutes = createRoutes([
  { path: "/", name: "home", routeView: homePage },
]);
```

```ts
// entities/__routes__/router.ts
import { createRouter } from "@echojs-ecosystem/router/hyperdom";
import { appRoutes } from "./app.routes.js";

export const appRouter = createRouter({
  history: "browser",
  routes: appRoutes,
  notFoundView: () => NotFound(),
});
```

Register once via `createRouterProvider(appRouter)` in bootstrap (see [First Application](/docs/getting-started/first-application)).

## Layouts and nested routes

Use a layout when several pages share chrome (sidebar, tabs, auth shell):

```ts
const appShell = createLayoutView({
  name: "app-shell",
  view: ({ outlet }) => AppChrome(outlet()),
});

export const appRoutes = createRoutes([
  {
    path: "/",
    name: "root",
    layoutView: appShell,
    children: [
      { path: "/", name: "home", routeView: homePage },
      { path: "settings", name: "settings", routeView: settingsPage },
    ],
  },
]);
```

Path rules:

- Root segment uses a leading `/` (`"/"`).
- Children use **relative** segments (`"settings"`, `"users/:id"`).
- Dynamic params: `:id`; splats: trailing `*`.

> [!RECOMMENDATION]
> Keep route definitions in `entities/__routes__/` and page factories in `pages/**` — matches [Project Structure](/docs/getting-started/project-structure).

## Pages and `bindModelView`

Typical page export:

```ts
import { createRouteView } from "@echojs-ecosystem/router";
import { bindModelView } from "@core/ui/bind-model-view.js";
import { createSettingsModel } from "./model/settings.model.js";
import { SettingsView } from "./ui/settings.view.js";

export const settingsPage = createRouteView({
  name: "settings",
  view: () => bindModelView(createSettingsModel, SettingsView),
});
```

The route `view` is a HyperDOM child factory — no JSX, no hooks.

## Navigation in UI

Prefer **`NavLink`** for in-app navigation (no full reload, active class from `$isOpened`):

```ts
import { NavLink } from "@echojs-ecosystem/router/hyperdom";

NavLink({
  to: settingsPage,
  class: "nav-item",
  activeClass: "nav-item--active",
  children: "Settings",
});
```

Imperative navigation when needed:

```ts
settingsPage.go();
userPage.go({ id: "42" }, { query: { tab: "posts" }, replace: true });
```

## `beforeLoad` and route data

Load data **before** the page paints — not inside the view:

```ts
export const userPage = createRouteView({
  name: "user",
  view: ({ data }) => bindModelView(() => createUserModel(data), UserView),
  beforeLoad: async ({ params }) => loadUserProfile(params.id),
  loadingView: () => RouteSpinner(),
  errorView: ({ error }) => RouteError(error),
});
```

- Result is available as `data` in `view` and on `page.$data`.
- Layout `beforeLoad` runs **before** child routes; a failing layout blocks children.
- Loading/error UI priority: page → parent layout → router globals.

See `apps/example` → `workspace/users/user-detail.page.ts` and `workspace/slow` for delayed loaders.

## Guards

### Per-route (`guardRoute`)

```ts
import { guardRoute } from "@echojs-ecosystem/router";
import { $isLoggedIn } from "@entities/session/index.js";
import { authLoginPage } from "@pages/auth/login/auth-login.page.js";
import { settingsPage } from "@pages/workspace/settings/workspace-settings.page.js";

guardRoute({
  route: settingsPage,
  canOpen: () => $isLoggedIn.value(),
  otherwise: authLoginPage,
});
```

Import guard modules from `entities/__routes__/guards.ts` so they run at startup (`apps/example` pattern).

### Global (`authorizationGuard`)

On `createRouter`:

```ts
createRouter({
  routes: appRoutes,
  authorizationGuard: {
    isAuthorized: () => authTokenStore.value() != null,
    allowedUnauthorizedPaths: ["/", "/auth/login"],
    redirectTo: "/auth/login",
    redirectWhenAuthorized: "/",
  },
});
```

Use **global** guard for “whole app behind login”; use **`guardRoute`** for a few protected pages.

## Lazy routes

```ts
import { createLazyRouteView } from "@echojs-ecosystem/router";

export const reportsPage = createLazyRouteView({
  name: "reports",
  view: () => import("./reports.page.js"),
  loadingView: () => "Loading…",
});
```

Chunk default export must be a `RouteView`. Call `reportsPage.preload()` to warm the chunk on hover.

## Docs site pattern

`apps/docs` maps markdown `contentId` to routes and keeps nav in `core/content/nav.ts`:

```ts
{ path: "guides/routing", name: "docs-guides-routing", routeView: getDocPage("guides/routing") }
```

Shell chrome can sit **outside** `router.View` with a pass-through layout — see [Providers](/docs/architecture/providers).

## URL query state

For filters, tabs, and shareable UI state prefer `@echojs-ecosystem/url-state` over ad-hoc `location.search` parsing — see [URL state](/docs/state/url-state) and [State overview](/docs/state/overview).

## Related

- [Router package](/docs/packages/router/overview) — installation, API, playground
- [Authentication](/docs/guides/authentication) — session + guards
- [Data fetching](/docs/guides/data-fetching) — async data with `beforeLoad` vs query
- Example app routes — `apps/example/src/entities/__routes__/`
