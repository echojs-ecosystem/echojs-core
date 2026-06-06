---
title: Managers & Utilities
description: Abort helpers, focus/online managers, key hashing, and low-level classes.
package: "@echojs-ecosystem/query"
---

# Managers & Utilities

## Key utilities

| Export | Description |
| --- | --- |
| `hashKey`, `partialMatchKey` | Key hashing |
| `matchQuery` | Filter queries in cache |

## Abort helpers

| Export | Description |
| --- | --- |
| `CancelledError`, `isCancelledError` | Cancel detection |
| `createFetchAbortHandle`, `mergeFetchAbortSource`, `resolveAbortInput`, `abortWithReason` | Abort wiring |

## Refetch managers

| Export | Description |
| --- | --- |
| `FocusManager`, `focusManager` | Window focus refetch |
| `OnlineManager`, `onlineManager` | Reconnect refetch |

## Pagination helpers

| Export | Description |
| --- | --- |
| `hasInfiniteNextPage`, `hasInfinitePreviousPage` | Pagination flags |

## Low-level classes (advanced)

`Query`, `QueryCache`, `InfiniteQuery`, `InfiniteQueryCache`, `Mutation`, `MutationCache`, `QueryObserver`, `InfiniteQueryObserver`

## Exported types (selected)

`QueryClientConfig`, `QueryKey`, `QueryDefinition`, `QueryInstance`, `InfiniteQueryDefinition`, `InfiniteQueryInstance`, `InfiniteQueryData`, `QueryStatus`, `QueryFetchStatus`, `MutationDefinition`, `MutationInstance`, `MutationStatus`, `QueryOptions`, `QueryInstanceOptions`, `QueryFnContext`, `InvalidateQueriesOptions`, `QueryFilter`, `RefetchOptions`, `FetchPageOptions`, `MutationRunOptions`, `AbortControlOptions`, `StoreLike`, …

## See also

- [Guides: Abort & Cancellation](/docs/packages/query/guides/abort-and-cancellation)
- [Guides: QueryClient & Cache](/docs/packages/query/guides/query-client)
