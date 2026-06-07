---
title: createQuery
description: createQuery(options, meta?) — define a cached async resource.
package: '@echojs-ecosystem/query'
---

# createQuery

```ts
function createQuery<TData, TParams, TError, TQueryData>(
  options: QueryOptions<TData, TParams, TError, TQueryData>,
  meta?: { provider?: QueryProvider | null }
): QueryDefinition<TData, TParams, TError>
```

Creates a **query definition** — a reusable template bound to params via
`.with()`.

## QueryOptions

| Field                                             | Type                                           |
| ------------------------------------------------- | ---------------------------------------------- |
| `name`                                            | `string`                                       |
| `queryKey`                                        | `(params) => QueryKey`                         |
| `queryFn`                                         | `(ctx: QueryFnContext) => Promise<TQueryData>` |
| `transform`                                       | `(raw) => TData \| Promise<TData>`             |
| `staleTime` / `cacheTime`                         | `number` (ms)                                  |
| `retry` / `retryDelay`                            | number, false, or callbacks                    |
| `keepPreviousData`                                | `boolean`                                      |
| `abortPrevious`                                   | `boolean`                                      |
| `abortController` / `signal`                      | `AbortInput`                                   |
| `enabled`                                         | `boolean \| () => boolean`                     |
| `refetchOnMount`                                  | `boolean \| 'stale'`                           |
| `refetchOnWindowFocus` / `refetchOnReconnect`     | `boolean`                                      |
| `onStart` / `onSuccess` / `onError` / `onSettled` | lifecycle                                      |

## QueryDefinition

| Member                                   | Description          |
| ---------------------------------------- | -------------------- |
| `kind`                                   | `'query-definition'` |
| `name`                                   | Optional             |
| `queryKey(params)`                       | Key factory          |
| `with(params \| () => params, options?)` | `QueryInstance`      |
| `withStore(store, map, options?)`        | Params from store    |

## QueryInstance (selected)

| Method / signal                                                | Description   |
| -------------------------------------------------------------- | ------------- |
| `data()` / `value()`                                           | Cached data   |
| `error()`                                                      | Error or null |
| `status()` / `fetchStatus()`                                   | Status enums  |
| `isPending()`, `isFetching()`, `isStale()`, …                  | Helpers       |
| `refetch(options?)` / `invalidate()` / `cancel()` / `remove()` | Control       |
| `$data`, `$error`, `$status`, `$fetchStatus`, `$abortSignal`   | Signals       |

## See also

- [Guides: Query Definitions](/docs/packages/query/guides/query-definitions)
- [Guides: Reactive Binding](/docs/packages/query/guides/reactive-binding)
