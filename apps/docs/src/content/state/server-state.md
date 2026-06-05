---
title: Server state
description: Async data, cache, and mutations with @echojs-ecosystem/query — separate from router and stores.
keywords: [createQuery, createMutation, cache, staleTime]
---

# Server state

**Server state** is data that **originates on the server** (or any async source): REST, GraphQL, edge functions. The client keeps a **cache** with staleness, refetch, and invalidation via `@echojs-ecosystem/query`. It is not the same as [router loader](/docs/state/router-state) data or a manual [store](/docs/state/client-store) copy.

## Mental model

| Property | Server state (Query) | Router `beforeLoad` |
| --- | --- | --- |
| Cached across visits | Yes (configurable) | No (per navigation) |
| Shared by key | Yes (`queryKey`) | No |
| `invalidate()` / `refetch()` | Yes | Re-navigate |
| Background refetch | Yes | No |
| Best for | Lists, details, dashboards | Page gate, one-off bootstrap |

| Property | Server state | Client store |
| --- | --- | --- |
| Source | Network | Client-only |
| Stale/sync | Built-in | You implement |
| Typical | Users, products | Theme, UI flags |

> [!RECOMMENDATION]
> Do **not** `createStore(apiResponse)` and update it after fetch. Use `createQuery` and read `query.data()` in the model.

## Define and bind

```ts
// features/users/api/users.queries.ts
export const usersQuery = createQuery<User[]>({
  name: "users",
  queryKey: () => ["users"] as const,
  queryFn: ({ signal }) => fetch("/api/users", { signal }).then((r) => r.json()),
});

// page model
const users = usersQuery.with();
return {
  list: () => users.data(),
  loading: () => users.isPending(),
  error: () => users.error(),
  reload: () => users.refetch(),
};
```

Reactive params:

```ts
const detail = userByIdQuery.with(() => ({ id: userPage.$params.value().id }));
```

When `id` changes, query key changes → fetch aborts/restarts (see `abortPrevious`).

## Mutations change server state

```ts
export const saveUserMutation = createMutation({
  name: "save-user",
  mutationFn: (body: UserInput) => post("/api/users", body),
  onSuccess: () => usersQuery.invalidate(),
});
```

After mutation, **invalidate** or **update** related queries — do not only clear local form state.

## Status signals

Use in models and views:

- `isPending()`, `isFetching()`, `isSuccess()`, `isError()`
- `query.$data`, `query.$status` inside `effect` / `computed`

Views never call `fetch` directly — see [Data fetching guide](/docs/guides/data-fetching).

## URL + server state together

Common pattern:

- [URL state](/docs/state/url-state): `page`, `q`, `sort`
- Query: `listProductsQuery.with(() => ({ page: filters.value().page, q: filters.value().q }))`

The URL is shareable; the query cache avoids refetching identical keys within `staleTime`.

## Errors and auth

- 401 → clear [session store](/docs/state/client-store), redirect via [router](/docs/state/router-state).
- Expose `query.error()` in VM; optional global handlers in provider defaults.

## Related

- [State overview](/docs/state/overview)
- [Data fetching guide](/docs/guides/data-fetching)
- [Query package](/docs/packages/query/usage)
- Example — `apps/example/src/features/query-demo/`
