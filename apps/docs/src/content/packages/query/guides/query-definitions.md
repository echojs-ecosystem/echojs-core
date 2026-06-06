---
title: Query Definitions
description: createQuery — queryKey, queryFn, cache options, and where definitions live.
package: "@echojs-ecosystem/query"
---

# Query Definitions

A **query definition** describes how to load, cache, and invalidate a resource. Definitions are created once at module scope; models bind them to reactive params with `.with()`.

## Where queries live

| Location | Pattern |
| --- | --- |
| Feature API module | `features/*/api/*.queries.ts` — `createQuery` definitions |
| Page model | `docContentQuery.with(() => ({ contentId }))` |
| View | Read `query.data()`, `query.isPending()` — **no fetch in views** |

## Basic definition

```ts
import { createQuery } from "@echojs-ecosystem/query";

export const listUsersQuery = createQuery<User[]>({
  name: "jp-users",
  queryKey: () => ["jsonplaceholder", "users"] as const,
  queryFn: ({ signal }) => fetch("/users", { signal }).then((r) => r.json()),
  transform: (users) => users.map((u) => ({ ...u, name: u.name.trim() })),
});
```

## Required options

| Option | Description |
| --- | --- |
| `queryKey(params)` | Stable cache key (use `as const` tuples) |
| `queryFn(ctx)` | Async loader; receives `params`, `signal`, `abortController`, `queryClient`, `queryKey` |

## Common options

| Option | Default | Notes |
| --- | --- | --- |
| `staleTime` | `0` | Ms until data is stale |
| `cacheTime` | `300_000` | Ms before unused cache GC |
| `retry` | `false` | `number`, `false`, or predicate |
| `keepPreviousData` | `false` | Keep old data while key changes |
| `abortPrevious` | `true` | Cancel in-flight fetch on param change |
| `enabled` | `true` | `boolean` or `() => boolean` |
| `transform` | — | Map raw `queryFn` result to cached `TData` |
| `refetchOnWindowFocus` | — | Uses `focusManager` |
| `refetchOnReconnect` | — | Uses `onlineManager` |

Lifecycle hooks: `onStart`, `onSuccess`, `onError`, `onSettled`.

## Generics

```ts
createQuery<TData, TParams, TError, TQueryData>({ ... })
```

- `TData` — cached type after `transform`
- `TQueryData` — raw `queryFn` return (defaults to `TData`)
- `TParams` — `.with()` argument shape

## Guidelines

| Do | Avoid |
| --- | --- |
| One definition per resource | Duplicate keys for same data |
| `queryKey` includes all param fields | Stale cache collisions |
| Pass `signal` to `fetch` | Ignoring abort → race bugs |

## Related

- [Reactive Binding](/docs/packages/query/guides/reactive-binding)
- [API: createQuery](/docs/packages/query/api/create-query)
- [Examples: JSONPlaceholder](/docs/packages/query/examples/jsonplaceholder)
