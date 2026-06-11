---
title: Data Fetching
description:
  Queries, mutations, and router loaders — where async work lives in EchoJS
  apps.
keywords: [createQuery, createMutation, beforeLoad, QueryClient]
---

# Data Fetching

Async data in EchoJS flows through **`@echojs-ecosystem/async`** (cache,
retries, staleness) or **`beforeLoad`** on routes (one-shot loader data). Views
stay declarative; **models and API modules** own fetch wiring.

> [!TIP] Queries expose reactive status via signals (`$data`, `isPending()`).
> Read [Reactivity](/docs/guides/reactivity) for how VM accessors connect to
> HyperDOM.

## Where code lives

| Pattern               | Location                           | When                                   |
| --------------------- | ---------------------------------- | -------------------------------------- |
| Reusable fetchers     | `features/<name>/api/*.queries.ts` | Lists, details, shared endpoints       |
| Page-specific binding | `pages/**/model/*.model.ts`        | `.with(() => params)` from route/props |
| One-off route payload | `beforeLoad` on `createRouteView`  | Data tied to a single URL open         |
| Writes                | `createMutation` in API module     | POST/PUT/DELETE                        |
| HTTP client           | `@echojs-ecosystem/network`        | Shared fetch wrapper, hooks, retries   |

Example reference:
`apps/example/src/features/query-demo/api/jsonplaceholder.queries.ts`.

## Bootstrap Query

Register defaults once — **before** `routerProvider` if routes prefetch in
`beforeLoad`:

```ts
import { createQueryProvider } from '@echojs-ecosystem/async'

export const queryProvider = createQueryProvider({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

```ts
createEchoApp()
  .use(queryProvider)
  .use(routerProvider)
  .mount('#app')
```

## Define a query

```ts
import { createQuery } from '@echojs-ecosystem/async'

export type User = { id: number; name: string }

export const listUsersQuery = createQuery<User[]>({
  name: 'users-list',
  queryKey: () => ['api', 'users'] as const,
  queryFn: ({ signal }) =>
    fetch('/api/users', { signal }).then((r) => {
      if (!r.ok) throw new Error(String(r.status))
      return r.json()
    }),
})
```

**Query keys** — stable tuples with `as const`. Include every input that changes
the response:

```ts
queryKey: (p) => ['api', 'users', p.id, p.tab] as const
```

Optional `transform` maps the raw response before cache storage.

## Bind in a model

Reactive params — re-fetch when signals change:

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { createModel } from '@echojs-ecosystem/hyperdom'
import { getUserQuery } from '@features/users/api/users.queries.js'

export const createUserPanelModel = createModel((): UserPanelVM => {
  const $userId = signal(1)
  const user = getUserQuery.with(() => ({ id: $userId.value() }))

  return {
    userId: () => $userId.value(),
    setUserId: (id: number) => $userId.set(id),
    profile: () => user.data(),
    isLoading: () => user.isPending(),
    isError: () => user.isError(),
    error: () => user.error(),
    refresh: () => user.refetch(),
  }
}, 'UserPanelModel')
```

### Route-driven params

```ts
export const createDocModel = createModel(
  (props: { contentId: string }): DocVM => {
    const doc = docContentQuery.with(() => ({ contentId: props.contentId }))
    return {
      blocks: () => doc.data()?.blocks ?? [],
      isLoading: () => doc.isPending(),
    }
  },
  'DocModel'
)
```

### Store-driven filters

```ts
const posts = getUserPostsQuery.withStore($filter, (s) => ({
  userId: s.userId,
}))
```

### Conditional fetch

```ts
detailQuery.with(() => ({ id }), { enabled: () => id != null })
```

## Read in views

Views call VM accessors only — never `fetch` in `createView`:

```ts
export const UserPanelView = createView(
  (vm: UserPanelVM): Child =>
    div(null, [
      Show(() => vm.isLoading(), () => p(null, 'Loading…')),
      Show(
        () => vm.profile() != null,
        () => p(null, vm.profile()!.name)
      ),
      button({ onClick: vm.refresh }, () => 'Retry'),
    ]),
  'UserPanelView'
)
```

Status helpers: `isSuccess()`, `isError()`, `isRefetching()`, `hasData()`.
Low-level signals: `query.$data`, `query.$status`, `query.$fetchStatus` for
`effect` / `computed` in models.

## Docs article pattern

`apps/docs` loads markdown by `contentId`:

```ts
const docContentQuery = createQuery<DocDocument, { contentId: ContentId }>({
  name: 'doc-content',
  queryKey: (p) => ['doc', p.contentId] as const,
  queryFn: ({ params }) => loadContent(params.contentId),
})
```

Same cache entry when navigating between docs with the same id; new key when
`contentId` changes. The doc page model binds once per route open; HyperDOM
re-renders when `doc.data()` updates.

## Mutations

```ts
import { createMutation } from '@echojs-ecosystem/async'

export const updateProfileMutation = createMutation({
  name: 'update-profile',
  mutationFn: (body: ProfileInput) =>
    fetch('/api/profile', { method: 'PATCH', body: JSON.stringify(body) }).then(
      (r) => r.json()
    ),
  onSuccess: () => profileQuery.invalidate(),
})
```

Call `mutation.mutate(payload)` from model actions; expose `isPending()` /
`error()` on the VM. Set `retry: false` for mutations.

### Optimistic updates

Update local VM state in the model action, roll back on `onError`, invalidate on
`onSuccess` — keep optimism in the **model**, not the view.

## `beforeLoad` vs Query

| Use `beforeLoad`                            | Use `createQuery`                         |
| ------------------------------------------- | ----------------------------------------- |
| Data required to render **this route once** | Cached, shared, refetched, invalidated    |
| Simple loader with no client cache          | Lists with pagination, background refetch |
| Layout blocks children until ready        | Same data on multiple pages               |
| Access gate + minimal bootstrap payload     | Stale-while-revalidate UX                 |

**Combine both** — common pattern:

```ts
export const workspacePage = createRouteView({
  name: 'workspace',
  beforeLoad: async () => {
    await sessionQuery.prefetch()
    if (!sessionQuery.getData()) throw redirect(authLoginPage)
  },
  view: () => bindModelView(createWorkspaceModel, WorkspaceView),
})
```

`beforeLoad` enforces auth; Query keeps lists warm while the user navigates
inside the workspace.

## Prefetch on navigation

Warm cache before the route paints:

```ts
beforeLoad: async ({ params }) => {
  await getUserQuery.prefetch({ id: params.id })
}
```

Or prefetch on link hover in the model / nav widget:

```ts
onMouseEnter: () => userPage.preload?.() ?? getUserQuery.prefetch({ id })
```

## Invalidation

| Event              | Action                                      |
| ------------------ | ------------------------------------------- |
| Mutation success   | `relatedQuery.invalidate()` or `refetch()`  |
| Logout             | `queryClient.clear()` or targeted invalidate |
| Tab focus (optional)| `refetchOnWindowFocus` default              |
| Manual refresh     | `query.refetch()` from VM action            |

Keep invalidation in **API modules** (`onSuccess` callbacks) so pages stay thin.

## Errors and cancellation

- `queryFn` receives `signal` / `abortController` — respect abort on param
  changes (`abortPrevious` default `true`).
- Surface `query.error()` in the VM; route-level `errorView` for hard failures.
- Tune `staleTime` / `gcTime` per resource — lists can be stale longer than
  detail views.
- Auth errors — centralize 401 handling in network hooks; redirect via router.

## Loading UX patterns

| Pattern              | Implementation                          |
| -------------------- | --------------------------------------- |
| Inline spinner       | `vm.isLoading()` in view                |
| Skeleton             | Placeholder children while `isPending()` |
| Route-level block    | `loadingView` on `createRouteView`      |
| Stale data visible   | Show `data()` while `isRefetching()`    |

Avoid duplicating loading state in both `beforeLoad` and Query for the same
resource — pick one source of truth.

## Related

- [Reactivity](/docs/guides/reactivity) — signals, models, query binding
- [Query package](/docs/packages/async)
- [Network HTTP](/docs/packages/network-http) — client, retries, hooks
- [Routing](/docs/guides/routing) — `beforeLoad`, loading views
- [Server state](/docs/state/server-state)
- [Authentication](/docs/guides/authentication) — token-aware `queryFn`
