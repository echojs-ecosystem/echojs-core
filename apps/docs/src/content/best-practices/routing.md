---
title: Routing
description:
  Decision rules for routes, layouts, guards, beforeLoad, and navigation in
  EchoJS apps.
keywords: [routing, NavLink, beforeLoad, guards, lazy routes, layouts]
---

# Routing

Decision rules for URLs, layouts, and navigation. API walkthrough:
[Routing guide](/docs/guides/routing).

## One source of truth for URLs

| Do                                                         | Don't                                              |
| ---------------------------------------------------------- | -------------------------------------------------- |
| Define paths once in `entities/__routes__/*.routes.ts`     | Scatter `'/users/' + id` strings in widgets        |
| Pass **page objects** to `NavLink({ to: userPage })`       | Hard-code `href="/users/42"` in shared components  |
| Resolve links with `page.go({ id })` or `router.resolve()` | Call `history.push` with manual query strings      |
| Keep nav data next to routes (`core/content/nav/` in docs) | Duplicate route names in markdown and TS separately |

Page objects carry `$params`, `$query`, `$isOpened`, and `$data` as signals —
treat them like any other reactive source inside models.

## Where route files live

```
entities/__routes__/
  app.routes.ts       # top-level tree passed to createRouter
  docs.routes.ts      # optional feature-specific trees
  router.ts             # createRouter({ routes, history, … })
  guards.ts             # GuardRouteOptions[] passed to createRouter
  doc-pages.ts          # contentId → page map (docs site)
pages/
  home/home.page.ts     # createRouteView — only file routes import
```

**`*.page.ts` is the public surface of a screen.** Everything else in the page
folder is an implementation detail.

## Layouts

Layouts wrap children and render the nested page at `outlet()`:

```ts
const docsLayout = createLayoutView({
  name: 'docs-layout',
  view: ({ outlet }) => DocsShell(outlet()),
})

export const appRoutes = createRoutes([
  {
    path: '/docs',
    name: 'docs',
    layoutView: docsLayout,
    children: docChildren,
  },
])
```

| Rule | Why |
| ---- | --- |
| Layout `beforeLoad` runs **before** child `beforeLoad` | Shared auth or shell data can block the whole subtree |
| Put chrome (sidebar, header) in layout or **outside** `router.View` | Docs site mounts header outside router and uses a pass-through layout — see [Providers](/docs/architecture/providers) |
| Child paths are **relative** (`'packages/:id'`, not `'/docs/packages/:id'`) | `createRoutes` joins parent + child segments |

## `beforeLoad` vs Query

Both load data. Pick one primary source per resource:

| Use `beforeLoad` when…                              | Use `createQuery` when…                               |
| --------------------------------------------------- | ----------------------------------------------------- |
| Data is **required** before first paint             | Same data is reused across routes or tabs             |
| Result is route-scoped and not cached elsewhere     | You need background refetch, stale time, invalidation |
| You redirect on 404 / auth failure in one place     | Multiple components read the same cache key           |

**Common pattern:** `beforeLoad` returns IDs or lightweight DTO; model binds
`getUserQuery.with(() => ({ id: params.id }))` for cached profile details.

```ts
export const userPage = createRouteView({
  name: 'user',
  beforeLoad: async ({ params }) => {
    await assertUserExists(params.id)
    return { userId: params.id }
  },
  view: ({ data, params }) =>
    createComponent(
      () => createUserModel({ userId: data?.userId ?? params.id }),
      UserView
    )(),
  loadingView: () => RouteSpinner(),
  errorView: ({ error }) => RouteError(error),
})
```

Never call `fetch` inside `createView` — the view mounts after navigation;
you lose loading/error boundaries and duplicate requests on re-render.

## Guards

| Mechanism | Scope | Example |
| --- | --- | --- |
| `createRouter({ guards })` | Single page or subtree | Settings page requires `$isLoggedIn` |
| `beforeLoad` throw/redirect | One-off data guard | Redirect unknown `contentId` to 404 page |

Define guards in `app/router/guards.ts` and pass the array into `createRouter`.

## Imperative navigation

```ts
settingsPage.go()
userPage.go({ id: '42' }, { query: { tab: 'posts' } })
userPage.go({ id: '42' }, { replace: true }) // no extra history entry
```

Use `replace: true` after login redirects and filter-only URL tweaks. Prefer
`page.go()` over raw `router.navigate('/…')` so param types stay checked.

## Sidebar and mobile navigation

Patterns from `apps/docs`:

| User action              | Behavior                                                        |
| ------------------------ | --------------------------------------------------------------- |
| Tap **row** (title)      | `page.go()` to overview → close mobile drawer → keep sidebar root |
| Tap **chevron**          | Open drill sub-menu only → leave current doc → keep drawer open |
| Tap **doc link** in drill| `NavLink` navigates → `onClick` closes mobile drawer            |

Split click targets when a list item both **navigates** and **expands** — one
button for each job avoids confusing mobile UX.

Sync UI-only state (drill stack) with `effect` on `router.$path`, but use
`untrack()` when reading local stack inside route effects so manual drill does
not reset itself.

## Lazy and preloaded routes

```ts
export const reportsPage = createLazyRouteView({
  name: 'reports',
  view: () => import('./reports.page.js'),
  loadingView: () => 'Loading…',
})

// Warm chunk on hover
reportsPage.preload()
```

Default export of the lazy chunk must be a `RouteView`.

## Checklist

1. Page factory in `pages/**` — `createRouteView` + `createComponent(model, view)`.
2. Tree entry in `entities/__routes__/`.
3. Links use `NavLink({ to: page })` or `page.go()`.
4. Async data: `beforeLoad` and/or module-scoped `createQuery`.
5. Protected route: add a guard in `app/router/guards.ts`.
6. New doc/content route: markdown + `contentId` in `core/content/nav/`.

## Related

- [Routing guide](/docs/guides/routing) — router API tour
- [Data fetching](/docs/guides/data-fetching) — queries and `beforeLoad`
- [Authentication](/docs/guides/authentication) — guards and session
- [Overview](/docs/best-practices/overview)
