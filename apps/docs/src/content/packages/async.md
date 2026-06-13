---
title: Query
description:
  Signal-native async cache for models — queries, mutations, invalidation.
package: '@echojs-ecosystem/async'
keywords: [createQuery, createMutation, queryClient]
---

:::package-overview query

:::install @echojs-ecosystem/async

## Key APIs

| Export | Role |
| ------ | ---- |
| [`createQuery`](/docs/packages/async/api/create-query) | Fetch + cache with loading/error signals |
| [`createMutation`](/docs/packages/async/api/create-mutation) | POST/PUT/DELETE with optimistic updates |
| [`createInfiniteQuery`](/docs/packages/async/api/create-infinite-query) | Paginated lists with `fetchNextPage` |
| [`QueryClient`](/docs/packages/async/api/query-client) | Global cache, defaults, and invalidation |
| [`createQueryProvider`](/docs/packages/async/api/query-client) | Register client on `createEchoApp` |

## Common patterns

- Define queries in **`createModel`**, not views — bind `.with(() => params)` when
  route or filter signals change.
- Pass `signal` from `queryFn` to `fetch` for automatic abort on refetch.
- Invalidate with `queryClient.invalidateQueries({ queryKey: ['users'] })` after
  mutations.

> [!tip] Bind `.with(() => params)` inside `createModel`, not in views.

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/async/functions) | API index — queries, mutations, client |
| [Guides & Concepts](/docs/packages/async/guides/query-definitions) | Definitions, cache, cancellation |

Each API page: **Usage** → **Type Declarations** → **API** (see [createQuery](/docs/packages/async/api/create-query)).
