# @echojs/router

Programmatic router for the EchoJS ecosystem. Built on [`@echojs-ecosystem/reactivity`](../../reactivity). Hyperdom bindings live in `@echojs/router/hyperdom`.

## Philosophy

Routes are **plain objects with signals**, not framework components. A route knows its open state, params, and query; the router syncs URL ↔ routes. UI is optional: use route views with `view`, or `createRoute()` for redirects and guards only.

| Layer | Role |
|--------|------|
| **Page / Route** | `$isOpened`, `$params`, `$query`, `go()` / `open()`, events |
| **Router** | Matching, history, `authorizationGuard`, global loading/error |
| **History** | `browser` / `hash` / `memory` or custom `RouterHistory` |
| **Hyperdom** | `Link`, `NavLink`, `router.view()` |

## Installation

```json
{
  "dependencies": {
    "@echojs/router": "workspace:*"
  }
}
```

Hyperdom apps also use `@echojs/router/hyperdom`.

## createRouteView / createLayoutView

```ts
import { createRouteView, createLayoutView, createRoutes } from "@echojs/router";

const userPage = createRouteView({
  name: "user",
  view: ({ params, query, data, outlet }) => UserView(params, data, outlet()),
  beforeLoad: async ({ params, query, navigationId }) => {
    return fetchUser(params.id);
  },
  loadingView: () => Spinner(),
  errorView: ({ error }) => ErrorView(error),
});

const shell = createLayoutView({
  name: "app",
  view: ({ outlet }) => AppShell(outlet()),
});
```

- **`view`** — main UI for the route.
- **`loadingView`** / **`errorView`** — per-route loading and error UI (override router globals).
- **`beforeLoad`** — primary data hook (runs when the route opens).
- **`loader`** — deprecated alias for `beforeLoad`.
- Layout `beforeLoad` runs **before** child pages; layout failure skips child loads.

`createLayoutView` is the same options shape with `kind: "layout"` for nested shells.

## createLazyRouteView

Code-split a route: the view module loads on first open (similar to [effector `createLazyRouteView`](https://router.effector.dev/react/create-lazy-route-view.html)).

```ts
import { createLazyRouteView } from "@echojs/router";

const profilePage = createLazyRouteView({
  name: "profile",
  view: () => import("./profile-view.js"),
  loadingView: () => "Loading profile…",
});

// profile-view.ts — default export must be a RouteView function
export default function profileView({ params, data, outlet }) {
  return ProfileScreen(params, data);
}
```

- **`view`** — `() => import("…")`; the chunk must **`export default`** a `RouteView`.
- **`loadingView`** — shown while the chunk loads (before `beforeLoad`).
- Loaded views are **cached**; leaving and re-entering the route does not re-fetch the chunk.
- **`page.preload()`** — preloads the chunk and runs `beforeLoad` when the route is active.

## createRouter

```ts
import { createRouter } from "@echojs/router";

const router = createRouter({
  history: "browser", // | "memory" | "hash" | { type: "memory", initial: "/" } | createMemoryHistory()
  routes: createRoutes([
    { path: "/", name: "home", routeView: homePage },
    {
      path: "/users",
      name: "users",
      layoutView: usersLayoutPage,
      children: [
        { path: "/", name: "users-list", routeView: usersListPage },
        { path: ":id", name: "user", routeView: userPage },
      ],
    },
    { path: "/legacy", name: "legacy", route: legacyRoute },
  ]),
  loadingView: globalLoadingPage, // createRouteView instance or RouteLoadingView fn
  errorView: globalErrorPage,
  notFoundView: notFoundPage,
  authorizationGuard: {
    isAuthorized: () => $auth.value(),
    allowedUnauthorizedPaths: ["/", "/login"],
    allowedAuthorizedPaths: ["/", "/settings"],
    redirectTo: "/login",
    redirectWhenAuthorized: "/",
  },
});

router.start();
router.go("/users/1?tab=profile");
router.view(); // same as router.View
```

Router signals: `$path`, `$query`, `$fullPath`, `$activePage`, `$activeRoute`, `$matched`, `$params`, `$pending`, `$error`.

Loading/error UI priority: **page → nearest layout → router**.

## Legacy createRoute

```ts
const legacy = createRoute("legacy-user");
legacy.go({ id: "1" });
legacy.open({ id: "1" }); // alias
legacy.close();
```

Use `{ path, route }` in the tree for non-UI routes; combine with `redirect()` / `guardRoute()`.

## Hyperdom

```ts
import { createRouter, Link, NavLink } from "@echojs/router/hyperdom";

router.start();
render(router.View, document.getElementById("app")!);

Link({ to: userPage, params: { id: "42" }, children: "User" });
Link({ href: "/docs", children: "Docs" });
NavLink({ to: homePage, activeClass: "active", children: "Home" });
```

`RouterView(router, entries)` is deprecated — prefer `router.view()` and the `routes` tree.

## Operators

- `guardRoute({ route, canOpen, otherwise })`
- `redirect({ from, to, mapParams, mapQuery })`
- `chainRoute({ route, beforeOpen })`

## Paths & query

`:param`, trailing `*`, trailing-slash normalization, encode/decode.  
`parseQuery` / `stringifyQuery` — arrays use repeated keys (`?tag=a&tag=b`).

## authorizationGuard

- Guest whitelist: `allowedUnauthorizedPaths`
- Optional authorized whitelist: `allowedAuthorizedPaths`
- `redirectTo` / `redirectWhenAuthorized` — path literal **or** `(ctx) => path` with typed routes from `createRouter`
- `ctx.pathname` — current URL; `ctx.authorized` — result of `isAuthorized()`
- Redirect loops: skip when target === current path; in dev, throw if redirect target is forbidden
- Uses `matchPath` for pattern checks

## Limitations (v0)

- No async guard cancellation
- No file-based routing
- Simple 404 via `notFoundComponent`
- Browser/hash histories are minimal wrappers

## E2E (Playwright)

Browser integration tests live under `e2e/`:

| Path | Role |
|------|------|
| `e2e/fixture/` | Minimal Vite app (layout + outlet + `NavLink`) |
| `e2e/tests/*.spec.ts` | Playwright specs (URL, shell, history) |
| `playwright.config.ts` | Starts fixture via `bun run e2e:serve` |

```bash
cd packages/router
bun run test:e2e:install   # download Chromium (once per machine/CI image)
bun run test:e2e           # headless run
bun run test:e2e:ui        # interactive UI mode
bun run test:all           # vitest + playwright
```

Add new specs in `e2e/tests/`. Reuse `data-testid` hooks from the fixture or extend `e2e/fixture/main.ts` for new scenarios.

## License

Private monorepo package.
