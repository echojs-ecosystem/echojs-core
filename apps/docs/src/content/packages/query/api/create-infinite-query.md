---
title: createInfiniteQuery
description: createInfiniteQuery(options, meta?) — paginated query with fetchNextPage.
package: "@echojs-ecosystem/query"
---

# createInfiniteQuery

```ts
function createInfiniteQuery<TData, TParams, TPageParam, TError, TQueryData>(
  options: InfiniteQueryOptions<TData, TParams, TPageParam, TError, TQueryData>,
  meta?: { provider?: QueryProvider | null },
): InfiniteQueryDefinition<TData, TParams, TPageParam, TError>
```

Extends query-like options with pagination fields.

## Pagination options

| Field | Description |
| --- | --- |
| `initialPageParam` | First page cursor |
| `getNextPageParam` | `(lastPage, allPages) => next \| null \| undefined` |
| `getPreviousPageParam` | Optional backward pagination |

## InfiniteQueryInstance

| Member | Description |
| --- | --- |
| `pages()` / `pageParams()` | Loaded pages |
| `data()` | `{ pages, pageParams }` |
| `flatMap(selector)` | Flatten items across pages |
| `fetchNextPage()` / `fetchPreviousPage()` | Pagination |
| `hasNextPage()` / `hasPreviousPage()` | Flags |
| `fetchingNextPage()` / `fetchingPreviousPage()` | Loading flags |
| `refetch()` / `reset()` / `cancel()` / `remove()` | Lifecycle |
| `$data`, `$pages`, `$pageParams`, `$pending`, `$fetching`, … | Signals |

## See also

- [Guides: Infinite Queries](/docs/packages/query/guides/infinite-queries)
- [API: createQuery](/docs/packages/query/api/create-query)
