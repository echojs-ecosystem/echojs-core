---
title: Usage
description: createQuery, reactive .with(), QueryClient, mutations, infinite queries, and HyperDOM models.
package: "@echojs-ecosystem/query"
---

# Usage

## Where queries live

| Location | Pattern |
| --- | --- |
| Feature API module | `features/*/api/*.queries.ts` — `createQuery` definitions |
| Page model | `docContentQuery.with(() => ({ contentId }))` |
| View | Read `query.data()`, `query.isPending()` — **no fetch in views** |

Example feature: `apps/example/src/features/query-demo/api/jsonplaceholder.queries.ts`.

## `createQuery`

```ts
import { createQuery } from "@echojs-ecosystem/query";

export const listUsersQuery = createQuery<User[]>({
  name: "jp-users",
  queryKey: () => ["jsonplaceholder", "users"] as const,
  queryFn: ({ signal }) => fetch("/users", { signal }).then((r) => r.json()),
  transform: (users) => users.map((u) => ({ ...u, name: u.name.trim() })),
});
```

### Required options

| Option | Description |
| --- | --- |
| `queryKey(params)` | Stable cache key (use `as const` tuples) |
| `queryFn(ctx)` | Async loader; receives `params`, `signal`, `abortController`, `queryClient`, `queryKey` |

### Common options

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

## `.with()` — reactive binding

```ts
const $userId = signal(1);

const user = getUserQuery.with(() => ({ id: $userId.value() }));
const posts = getUserPostsQuery.with(
  () => ({ userId: $userId.value() }),
  { enabled: () => $postsEnabled.value() },
);
```

- Pass **params object** or **`() => params`** — the observer re-runs when tracked signals change
- Second argument overrides per-instance: `enabled`, `staleTime`, `signal`, `abortController`, …
- Void params: `listUsersQuery.with()` or `listUsersQuery.with(undefined)`

### `withStore`

```ts
import { createStore } from "@echojs-ecosystem/store";

const $filter = createStore({ userId: 1 });
const posts = getUserPostsQuery.withStore($filter, (s) => ({ userId: s.userId }));
```

## Reading state in models / views

```ts
const doc = query.data();           // TData | undefined
const err = query.error();          // TError | null
const pending = query.isPending();
const fetching = query.isFetching();
const stale = query.isStale();

// Signals for effect() / computed
query.$data.value();
query.$status.value();              // 'idle' | 'pending' | 'success' | 'error'
query.$fetchStatus.value();         // 'idle' | 'fetching' | 'paused'
```

Status helpers: `isSuccess()`, `isError()`, `isIdle()`, `isFirstPending()`, `isRefetching()`, `hasData()`, `hasError()`.

### Docs article pattern

```ts
const docContentQuery = createQuery<DocDocument, { contentId: ContentId }>({
  name: "doc-content",
  queryKey: ({ contentId }) => ["doc-content", contentId] as const,
  queryFn: async ({ params }) => parseMarkdown(await loadContentRaw(params.contentId)),
  staleTime: 3_600_000,
});

export const createDocArticleModel = (props: DocArticleProps) =>
  createModel((): DocArticleVM => {
    const query = docContentQuery.with(() => ({ contentId: props.contentId }));
    effect(() => {
      const doc = query.data();
      if (!doc) return;
      applySeo({ title: doc.frontmatter.title, ... });
    });
    return { props, query };
  }, "DocArticleModel");
```

Use `bindModelViewWith(props, ...)` when props change per navigation.

## Imperative instance API

```ts
await user.refetch();
user.invalidate();
user.cancel({ reason: "navigate-away" });
user.remove(); // drop from cache
```

## Abort & cancellation

Default: each fetch gets an `AbortController`; `queryFn` should pass `signal` to `fetch`.

```ts
// Route leave — bind external signal
const routeBound = getUserQuery.with(
  () => ({ id: $id.value() }),
  { signal: () => routeAc.signal },
);

// Manual controller per refetch
await user.refetch({ abortController: new AbortController() });
user.abort("user-cancelled");
```

| API | Role |
| --- | --- |
| `abortController()` / `abortSignal()` | Current in-flight handles |
| `abort(reason)` | Abort active fetch |
| `cancel(options)` | Cancel with optional `silent` / `reason` |
| `$abortSignal` | Reactive signal |

Same options work on `createMutation` / `createInfiniteQuery`.

## `QueryClient` (imperative cache)

Access via provider: `getQueryProvider()?.client` or pass `{ client }` to `.with()`.

```ts
import { createQueryClient } from "@echojs-ecosystem/query";

const client = createQueryClient();

await client.fetchQuery(getUserQuery, { id: 1 });
await client.prefetchQuery(getUserQuery, { id: 2 });
client.getQueryData(getUserQuery, { id: 1 });
client.setQueryData(getUserQuery, { id: 1 }, (prev) => ({ ...prev!, name: "New" }));
client.invalidateQueries(["users"]);
await client.refetchQueries({ queryKey: ["users"], exact: false });
client.cancelQueries(["user", 1]);
client.removeQueries({ queryKey: ["user"], exact: false });
client.clear();
```

## Mutations

```ts
import { createMutation } from "@echojs-ecosystem/query";

export const createPostMutation = createMutation({
  name: "create-post",
  mutationFn: ({ variables, signal }) =>
    jpFetch("/posts", { method: "POST", body: JSON.stringify(variables), signal }),
  onMutate: async ({ variables, queryClient }) => {
    const previous = queryClient.getQueryData(getUserPostsQuery, { userId: variables.userId });
    // optimistic update...
    return { previous };
  },
  onError: (_ctx, _err, rollback) => {
    // rollback?.previous
  },
});

// In model
const createPost = createPostMutation.create();
await createPost.run({ userId: 1, title: "Hello" });
createPost.isPending();
createPost.cancel();
```

Definitions use **`mutationFn`**, not `mutation` (README legacy name).

## Infinite queries

```ts
import { createInfiniteQuery } from "@echojs-ecosystem/query";

type PostsPage = { posts: Post[]; nextOffset: number | null };

export const userPostsInfinite = createInfiniteQuery<PostsPage, { userId: number }, number>({
  name: "user-posts-infinite",
  queryKey: ({ userId }) => ["posts", userId] as const,
  initialPageParam: 0,
  queryFn: async ({ params, pageParam, signal }) => { /* ... */ },
  getNextPageParam: (page) => page.nextOffset,
});

const posts = userPostsInfinite.with(() => ({ userId: $userId.value() }));

posts.pages();
posts.pageParams();
posts.flatMap((page) => page.posts);
posts.hasNextPage();
posts.fetchingNextPage();
await posts.fetchNextPage();
await posts.refetch();
posts.reset();
```

## Global refetch managers

- **`focusManager`** — refetch stale queries on window focus (browser)
- **`onlineManager`** — refetch on reconnect

Enabled per query via `refetchOnWindowFocus` / `refetchOnReconnect`.

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
| `enabled: () => …` for conditional fetch | Manual `if` + separate instances |
| Invalidate after mutations | Manually refetching every list |

## Related

- API — `/docs/packages/query/api`
- Guides → Data fetching (expand soon)
- Query demo — `/docs/guides/data-fetching` + example app
