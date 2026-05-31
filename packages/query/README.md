# @echojs/query

Signal-native query/cache/mutation layer for EchoJS. Model-first API (no hooks), inspired by [TanStack Query query-core](https://github.com/TanStack/query/tree/main/packages/query-core) and adapted for `@echojs/reactivity`.

## Install

```bash
bun add @echojs/query
```

Peer: `@echojs/reactivity`. Optional: `@echojs/store` for `withStore()`.

## Quick start

```ts
import { createQuery, createQueryClient } from '@echojs/query'

const client = createQueryClient()

export const getUserQuery = createQuery({
  name: 'get-user',
  key: ({ id }) => ['user', id],
  fetcher: ({ params, signal }) => api.users.get(params.id, { signal }),
  staleTime: '5m',
  cacheTime: '30m',
})

// Inside a model — reactive params via signal
const user = getUserQuery.with(() => ({ id: $userId.value() }), { client })

// Read state
user.data()
user.isPending()
user.$data.value()

// Imperative
await user.refetch()
user.invalidate()
```

## Architecture

Three layers:

| Layer | Role |
|-------|------|
| `QueryDefinition` | Declarative description (`createQuery`) |
| `QueryInstance` | `.with()` / `.withStore()` bound to params |
| `QueryClient` | Global cache, invalidation, prefetch |

Core classes (TanStack-style, signal-backed):

- `Query` — fetch lifecycle, retry, cancel, GC
- `QueryCache` — keyed store of `Query` instances
- `QueryClient` — public imperative API
- `QueryObserver` — reactive params + instance wiring

State is exposed through signals (`$data`, `$error`, `$status`, `$fetchStatus`, …) instead of a notify manager.

## API

### `createQuery(options)`

| Option | Description |
|--------|-------------|
| `key(params)` | Stable cache key |
| `fetcher({ params, signal, queryClient, queryKey })` | Async data loader |
| `staleTime` / `cacheTime` | `number` or `'5m'`, `'30s'`, … |
| `retry` / `retryDelay` | Retry policy |
| `keepPreviousData` | Keep old data while key changes |
| `abortPrevious` | Cancel in-flight fetch on param change (default `true`) |
| `enabled` | Skip fetch when `false` |
| `refetchOnMount` / `refetchOnWindowFocus` / `refetchOnReconnect` | Refetch triggers |

### `QueryInstance`

```ts
instance.data()          // Data | undefined
instance.error()         // Error | null
instance.status()        // 'idle' | 'pending' | 'success' | 'error'
instance.isFetching()
instance.isStale()
instance.refetch()
instance.invalidate()
instance.cancel()
instance.remove()

instance.$data           // ReadonlySignal
instance.$status
instance.$pendingCount
```

### Abort / cancellation

By default each fetch/mutation run gets its own `AbortController`. You can plug in your own controller or external signal at definition, instance, or per-operation level.

```ts
// 1. Auto (default) — queryFn receives signal + abortController
createQuery({
  queryFn: async ({ signal, abortController }) => fetch(url, { signal }),
})

// 2. Instance-level external controller (reused on every refetch)
const ac = new AbortController()
const user = getUserQuery.with({ id: '1' }, { abortController: ac })
ac.abort() // or user.abort() / user.cancel()

// 3. Per-refetch / per-run override
await user.refetch({ abortController: new AbortController() })
await updateUser.run(vars, { abortController: manualAc })
await feed.fetchNextPage({ signal: parentSignal })

// 4. External signal only — library links it to the in-flight fetch
getUserQuery.with({ id: '1' }, { signal: () => routeAbortSignal })

// Instance API
user.abortController() // current in-flight controller | null
user.abortSignal()     // current signal | null
user.abort('reason')   // cancel with AbortSignal reason
user.cancel({ reason: 'navigate-away' })
user.$abortSignal      // reactive signal access
```

| Option | Where | Effect |
|--------|-------|--------|
| `abortController` | definition / `.with()` / `refetch()` / `run()` / `fetchNextPage()` | Use your controller; `cancel()` aborts it |
| `signal` | same | Abort when external signal fires |
| `abortPrevious` | query options | Cancel previous fetch on param change (default `true`) |

Works the same for `createQuery`, `createInfiniteQuery`, and `createMutation`.

### `createQueryClient()`

```ts
client.fetchQuery(definition, params)
client.prefetchQuery(definition, params)
client.getQueryData(definition, params)
client.setQueryData(definition, params, updater)
client.invalidateQueries(['users'])
client.refetchQueries({ queryKey: ['users'], exact: false })
client.cancelQueries(filter)
client.removeQueries(filter)
client.clear()
```

### Mutations

```ts
import { createMutation } from '@echojs/query'

const updateUser = createMutation({
  mutation: ({ variables, signal }) => api.users.update(variables, { signal }),
  onMutate: ({ variables, queryClient }) => {
    const previous = queryClient.getQueryData(getUserQuery, { id: variables.id })
    queryClient.setQueryData(getUserQuery, { id: variables.id }, (u) => ({ ...u!, ...variables.input }))
    return () => queryClient.setQueryData(getUserQuery, { id: variables.id }, previous)
  },
}).create({ client })

await updateUser.run({ id: '1', input: { name: 'Vova' } })
```

### Infinite queries

```ts
import { createInfiniteQuery } from '@echojs/query'

type PostsPage = { posts: Post[]; nextOffset: number | null }

export const userPostsInfinite = createInfiniteQuery<
  PostsPage,
  { userId: number },
  number
>({
  name: 'user-posts-infinite',
  queryKey: ({ userId }) => ['posts', userId],
  initialPageParam: 0,
  queryFn: async ({ params, pageParam, signal }) => {
    const posts = await api.posts.list(params.userId, { start: pageParam, limit: 10, signal })
    return {
      posts,
      nextOffset: posts.length < 10 ? null : pageParam + 10,
    }
  },
  getNextPageParam: (page) => page.nextOffset,
})

// In a model — reactive params
const posts = userPostsInfinite.with(() => ({ userId: $userId.value() }))

// First page loads on mount; append with fetchNextPage
posts.pages()
posts.pageParams()
posts.flatMap((page) => page.posts)
posts.hasNextPage()
posts.fetchingNextPage()

await posts.fetchNextPage()
await posts.refetch()   // reload from initialPageParam
posts.reset()
```

| Method | Description |
|--------|-------------|
| `pages()` / `pageParams()` | Loaded pages and their cursor params |
| `flatMap(selector)` | Flatten items across pages |
| `fetchNextPage()` / `fetchPreviousPage()` | Load adjacent page |
| `hasNextPage()` / `hasPreviousPage()` | Pagination flags |
| `fetchingNextPage()` | Loading state for append |

### Managers

`focusManager` and `onlineManager` refetch stale active queries when the window regains focus or the network reconnects.

## Borrowed from TanStack Query

- `hashKey` / `partialMatchKey` — stable key hashing
- `matchQuery` — cache filtering
- `createRetryer` — retry loop with cancel
- `queryReducer` — immutable state transitions
- `Subscribable` / `Removable` — observer + GC base classes

## EchoJS differences

- **Signals** instead of external subscribers for UI state
- **Definition/instance** API for `createModel` integration
- **No React hooks** — framework-agnostic core

## License

Private monorepo package.
