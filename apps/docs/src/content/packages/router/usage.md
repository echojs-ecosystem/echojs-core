---
title: Usage
description: Route trees, pages, layouts, navigation, beforeLoad, lazy routes, and guards.
package: "@echojs/router"
---

# Usage

## Route tree with `createRoutes`

```ts
import { createRoutes, createRouteView, createLayoutView } from "@echojs/router";

const shellLayout = createLayoutView({
  name: "app-shell",
  view: ({ outlet }) => AppShell(outlet()),
});

const homePage = createRouteView({
  name: "home",
  view: () => bindModelView(createHomeModel, HomeView),
});

const userPage = createRouteView({
  name: "user",
  view: ({ params, data, outlet }) => UserView(params, data, outlet()),
  beforeLoad: async ({ params, query, navigationId }) => {
    return fetchUser(params.id);
  },
  loadingView: () => RouterLoading(),
  errorView: ({ error }) => RouterError(error),
});

export const appRoutes = createRoutes([
  {
    path: "/",
    name: "root",
    layoutView: shellLayout,
    children: [
      { path: "/", name: "home", routeView: homePage },
      { path: "users/:id", name: "user", routeView: userPage },
    ],
  },
]);
```

Path rules:

- Leading `/` on root segment; children use **relative** segments (`users/:id`)
- Dynamic segments: `:param`
- Trailing `*` splats supported (see API)

Each `name` must be unique — used for `router.routes.home` style maps.

## `createRouter` lifecycle

```ts
import { createRouter } from "@echojs/router/hyperdom";

const router = createRouter({
  history: "browser",
  routes: appRoutes,
  loadingView: globalLoading,
  errorView: globalError,
  notFoundView: notFound,
  authorizationGuard: {
    isAuthorized: () => $session.value() != null,
    allowedUnauthorizedPaths: ["/", "/login"],
    redirectTo: "/login",
    redirectWhenAuthorized: "/",
  },
});

router.start(); // listen to history / apply initial URL
router.go("/users/42?tab=posts");
router.stop(); // teardown
```

### Global UI priority

When a page is loading or errors:

1. Page’s own `loadingView` / `errorView`
2. Nearest parent **layout** view
3. Router-level `loadingView` / `errorView`

## Page view context

```ts
createRouteView({
  name: "dashboard",
  view: ({ params, query, data, outlet }) => {
    // params — route params object (signals on page.$params too)
    // query — parsed query record
    // data — result of beforeLoad (page.$data)
    // outlet — () => Child for nested child route (layouts only)
    return DashboardView(data);
  },
});
```

Layouts **must** render `outlet()` where child pages appear:

```ts
createLayoutView({
  name: "docs-shell",
  view: ({ outlet }) => DocsChrome(outlet()),
});
```

In `apps/docs`, chrome may live outside `router.View` — layout can be pass-through `outlet()` only.

## Navigation

### Imperative

```ts
homePage.go();
userPage.go({ id: "42" }, { query: { tab: "profile" }, replace: true });
userPage.open({ id: "1" }); // alias for go
```

### HyperDOM `NavLink` (preferred in UI)

```ts
import { NavLink } from "@echojs/router/hyperdom";

NavLink({
  to: userPage,
  params: { id: "42" },
  query: { tab: "profile" },
  activeClass: "is-active",
  class: "nav-link",
  children: "User",
});
```

- `preventDefault` + `page.go()` — **no full page reload**
- `activeClass` when `to.$isOpened` is true

### Plain `Link`

```ts
import { Link } from "@echojs/router/hyperdom";

Link({ href: "/docs/guides/routing", children: "Routing guide" });
Link({ to: homePage, children: "Home" });
```

## `beforeLoad` and `$data`

```ts
const docPage = createRouteView({
  name: "doc",
  view: ({ data }) => DocView(data),
  beforeLoad: async ({ params }) => {
    return loadMarkdown(params.contentId);
  },
});
```

- Runs when route opens (and when params/query change per navigation)
- Result stored on `page.$data`
- `loader` is a deprecated alias for `beforeLoad`
- Layout `beforeLoad` runs **before** child pages; failing layout skips children

Access pending/error via router signals: `router.$pending`, `router.$error`, or page state in views.

## Lazy routes

```ts
import { createLazyRouteView } from "@echojs/router";

const settingsPage = createLazyRouteView({
  name: "settings",
  view: () => import("./settings.page.js"),
  loadingView: () => "Loading settings…",
});
```

Default export of the chunk must be a **`RouteView` function**. Chunk is cached after first load. `page.preload()` can warm the chunk.

## Legacy `createRoute` (no UI)

For redirects and guards without a view:

```ts
import { createRoute } from "@echojs/router";

const legacy = createRoute("legacy-redirect");
legacy.go({ id: "1" });
legacy.close();
```

In the tree:

```ts
{ path: "old-path", name: "old", route: redirect({ from: "...", to: "..." }) }
```

## Operators

| Operator | Purpose |
| --- | --- |
| `redirect({ from, to, mapParams, mapQuery })` | Path redirect |
| `guardRoute({ route, canOpen, otherwise })` | Conditional open |
| `chainRoute({ route, beforeOpen })` | Hook before route opens |

Combine with `route` entries in `createRoutes` (not `routeView`).

## Query strings

Built-in `parseQuery` / `stringifyQuery`:

- Arrays use repeated keys: `?tag=a&tag=b`
- Available on `page.$query` and `beforeLoad` context

## Typed route map

`createRoutes` infers `router.routes` keys from `name` fields — use for autocomplete when resolving links in code.

```ts
router.resolve(userPage, { id: "1" }, { query: { tab: "a" } });
// → "/users/1?tab=a"
```

## Docs site pattern

`apps/docs` maps markdown `contentId` to paths:

```ts
{ path: "guides/routing", name: "docs-guides-routing", routeView: getDocPage("guides/routing") }
```

Single source in `core/content/nav.ts` + `canonicalDocsRouteItems()` for deduped routes.

## Related

- API reference — `/docs/packages/router/api`
- Architecture → Providers
- Example — `apps/example/src/entities/__routes__`
