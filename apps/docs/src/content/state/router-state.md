---
title: Router state
description: Path, params, query, and beforeLoad data — what the router owns and what it does not.
keywords: [router, params, query, beforeLoad, navigation]
---

# Router state

**Router state** is everything derived from **navigation**: which route is active, path parameters, the parsed query string on that route, and optional **loader** payload from `beforeLoad`. It is owned by `@echojs/router` and updates when the user follows links, uses back/forward, or you call `page.go()`.

## What counts as router state

| Piece | API | Example |
| --- | --- | --- |
| Active route | `page.$isOpened`, `router.$location` | User on `user` route |
| Path params | `page.$params`, `view({ params })` | `{ id: "42" }` for `/users/:id` |
| Query string | `page.$query`, `beforeLoad({ query })` | `{ tab: "posts" }` |
| Loader result | `page.$data`, `view({ data })` | Profile fetched in `beforeLoad` |
| Pending / error | `router.$pending`, page loading views | Spinner while loader runs |

Router state is **synchronized with browser history** (`history: "browser"`). It is the source of truth for “where am I in the app?”.

## What router state is not

| Not router state | Use instead |
| --- | --- |
| Cached API lists | [Server state](/docs/state/server-state) |
| Typed catalog filters (often) | [URL state](/docs/state/url-state) |
| Form field values | [Form state](/docs/state/form-state) |
| Theme / session | [Client store](/docs/state/client-store) |
| Modal open/closed | [Local UI state](/docs/state/local-ui-state) |

> [!NOTE]
> Raw `page.$query` and `@echojs/url-state` both read the same `location.search`. Prefer **url-state** when you need parsers, defaults, and `reset()` — not ad-hoc string parsing in every model.

## Params — identity in the path

```ts
// Route: /users/:id
userPage.go({ id: "42" });

// In view / model
const id = userPage.$params.value().id;
```

Params change when navigation changes. Do **not** copy `id` into an unrelated `signal` unless you need a draft that intentionally diverges from the URL.

## Query — optional segments

Router exposes parsed query on the active page:

```ts
beforeLoad: async ({ params, query }) => {
  const tab = query.tab ?? "overview";
  return loadUserTab(params.id, tab);
},
```

For **app-wide filter state** (pagination, search) used on many pages, see [URL state](/docs/state/url-state) — same bytes in the bar, better ergonomics.

## `beforeLoad` — route-scoped async data

```ts
export const userPage = createRouteView({
  name: "user",
  view: ({ data }) => UserView(data),
  beforeLoad: async ({ params }) => loadUserProfile(params.id),
});
```

Characteristics:

- Runs when the route opens (and when params/query for that route change).
- Result is **scoped to this navigation** — not a global cache.
- Good for: “this page cannot render without X”.
- Poor for: shared lists, background refetch, invalidation after mutation → use [Server state](/docs/state/server-state).

Loading UI: page `loadingView` → parent layout → router default (see [Routing guide](/docs/guides/routing)).

## Navigation updates router state

```ts
NavLink({ to: userPage, params: { id: "1" }, query: { tab: "a" }, children: "User" });
userPage.go({ id: "2" }, { replace: true });
```

`NavLink` avoids full page reloads; router updates signals; bound views re-render.

## Guards read router + store

```ts
guardRoute({
  route: settingsPage,
  canOpen: () => $isLoggedIn.value(),
  otherwise: authLoginPage,
});
```

`canOpen` often reads [client store](/docs/state/client-store) (session), but the **outcome** is router behavior (redirect to login route).

## Related

- [State overview](/docs/state/overview)
- [URL state](/docs/state/url-state)
- [Routing guide](/docs/guides/routing)
- [Router package](/docs/packages/router/usage)
