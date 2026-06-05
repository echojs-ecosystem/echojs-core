---
title: API Reference
description: Public exports from @echojs-ecosystem/query.
package: "@echojs-ecosystem/query"
---

# API Reference

## Factories

| Export | Description |
| --- | --- |
| `createQuery(options, meta?)` | `QueryDefinition` |
| `createInfiniteQuery(options, meta?)` | `InfiniteQueryDefinition` |
| `createMutation(options, meta?)` | `MutationDefinition` |
| `createQueryClient(config?)` | `QueryClient` |

`meta?: { provider?: QueryProvider | null }` overrides provider resolution.

## Provider & context

| Export | Description |
| --- | --- |
| `createQueryProvider(config)` | Echo provider; sets global provider + `app.provide` |
| `createQueryPlugin` | Deprecated alias |
| `QueryProvider` | Class with `.client` and `.config` |
| `getQueryProvider()` | Current provider or `null` |
| `requireQueryProvider()` | Throws if missing |
| `setQueryProvider` / `resetQueryProvider` | Test / advanced setup |
| `QUERY_PROVIDER_KEY` | Symbol for DI |
| `getDefaultQueryClient()` / `setDefaultQueryClient()` | Fallback client |

## `QueryOptions` (definition)

| Field | Type |
| --- | --- |
| `name` | `string` |
| `queryKey` | `(params) => QueryKey` |
| `queryFn` | `(ctx: QueryFnContext) => Promise<TQueryData>` |
| `transform` | `(raw) => TData \| Promise<TData>` |
| `staleTime` / `cacheTime` | `number` (ms) |
| `retry` / `retryDelay` | number, false, or callbacks |
| `keepPreviousData` | `boolean` |
| `abortPrevious` | `boolean` |
| `abortController` / `signal` | `AbortInput` |
| `enabled` | `boolean \| () => boolean` |
| `refetchOnMount` | `boolean \| 'stale'` |
| `refetchOnWindowFocus` / `refetchOnReconnect` | `boolean` |
| `onStart` / `onSuccess` / `onError` / `onSettled` | lifecycle |

## `QueryDefinition`

| Member | Description |
| --- | --- |
| `kind` | `'query-definition'` |
| `name` | Optional |
| `queryKey(params)` | Key factory |
| `with(params \| () => params, options?)` | `QueryInstance` |
| `withStore(store, map, options?)` | Params from store |

## `QueryInstance`

| Method / signal | Description |
| --- | --- |
| `data()` / `value()` | Cached data |
| `error()` | Error or null |
| `params()` | Current params |
| `status()` | `'idle' \| 'pending' \| 'success' \| 'error'` |
| `fetchStatus()` | `'idle' \| 'fetching' \| 'paused'` |
| `isPending()`, `isFetching()`, `isStale()`, … | Status helpers |
| `refetch(options?)` | Refetch |
| `invalidate()` | Mark stale |
| `cancel()` / `remove()` | Cancel / evict |
| `subscribe(listener)` | Data listener |
| `$data`, `$error`, `$params`, `$status`, `$fetchStatus`, `$pendingCount`, `$isStale`, `$updatedAt`, `$abortSignal` | Signals |
| `abortController()`, `abortSignal()`, `abort()`, `cancel()` | Abort API |

## `InfiniteQueryOptions`

Extends query-like options with:

| Field | Description |
| --- | --- |
| `initialPageParam` | First page cursor |
| `getNextPageParam` | `(lastPage, allPages) => next \| null \| undefined` |
| `getPreviousPageParam` | Optional backward pagination |

## `InfiniteQueryInstance`

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

## `MutationOptions`

| Field | Description |
| --- | --- |
| `mutationFn` | `(ctx) => Promise<TData>` — `variables`, `signal`, … |
| `onMutate` / `onSuccess` / `onError` / `onSettled` | Lifecycle |
| `retry` / `retryDelay` | Same as queries |
| `abortController` / `signal` | Abort wiring |

## `MutationDefinition` / `MutationInstance`

| Member | Description |
| --- | --- |
| `.create({ client? })` | `MutationInstance` |
| `run(variables, options?)` | Execute mutation |
| `data()`, `error()`, `variables()`, `status()` | State |
| `isPending()`, `isSuccess()`, … | Helpers |
| `reset()` / `cancel()` | Control |
| `$data`, `$error`, `$variables`, `$status`, `$pendingCount`, `$abortSignal` | Signals |

## `QueryClient`

| Method | Description |
| --- | --- |
| `fetchQuery(definition, params)` | Fetch or return cached |
| `prefetchQuery(definition, params)` | Warm cache |
| `getQueryData` / `setQueryData` | Read/write cache entry |
| `invalidateQueries(filter, options?)` | Mark stale |
| `refetchQueries(filter)` | Refetch matches |
| `cancelQueries(filter)` | Cancel in-flight |
| `removeQueries(filter)` | Remove from cache |
| `clear()` | Clear all |

## Utilities & core (advanced)

| Export | Description |
| --- | --- |
| `hashKey`, `partialMatchKey` | Key hashing |
| `matchQuery` | Filter queries in cache |
| `CancelledError`, `isCancelledError` | Cancel detection |
| `createFetchAbortHandle`, `mergeFetchAbortSource`, `resolveAbortInput`, `abortWithReason` | Abort helpers |
| `FocusManager`, `focusManager` | Window focus refetch |
| `OnlineManager`, `onlineManager` | Reconnect refetch |
| `Query`, `QueryCache`, `InfiniteQuery`, `InfiniteQueryCache`, `Mutation`, `MutationCache`, `QueryObserver`, `InfiniteQueryObserver` | Low-level classes |
| `hasInfiniteNextPage`, `hasInfinitePreviousPage` | Pagination helpers |

## Types (exported)

`QueryClientConfig`, `QueryKey`, `QueryDefinition`, `QueryInstance`, `InfiniteQueryDefinition`, `InfiniteQueryInstance`, `InfiniteQueryData`, `QueryStatus`, `QueryFetchStatus`, `MutationDefinition`, `MutationInstance`, `MutationStatus`, `QueryOptions`, `QueryInstanceOptions`, `QueryFnContext`, `InvalidateQueriesOptions`, `QueryFilter`, `RefetchOptions`, `FetchPageOptions`, `MutationRunOptions`, `AbortControlOptions`, `StoreLike`, …

## EchoJS vs TanStack

| TanStack (React) | EchoJS Query |
| --- | --- |
| `useQuery` hook | `definition.with(() => params)` in model |
| `queryKey` + `queryFn` | Same names |
| NotifyManager | **Signals** (`$data`, …) |
| Context provider | `createQueryProvider` |

## Related

- Usage — `/docs/packages/query/usage`
- Overview — `/docs/packages/query`
