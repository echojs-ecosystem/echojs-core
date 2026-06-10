---
title: Reactive Binding
description:
  .with() and withStore — bind query definitions to reactive params in models.
package: '@echojs-ecosystem/async'
---

# Reactive Binding

Query definitions are templates. **Instances** are created in models via
`.with()` — they re-fetch when tracked signals change.

## `.with()` — signal-driven params

```ts
const $userId = signal(1)

const user = getUserQuery.with(() => ({ id: $userId.value() }))
const posts = getUserPostsQuery.with(() => ({ userId: $userId.value() }), {
  enabled: () => $postsEnabled.value(),
})
```

- Pass **params object** or **`() => params`** — the observer re-runs when
  tracked signals change
- Second argument overrides per-instance: `enabled`, `staleTime`, `signal`,
  `abortController`, …
- Void params: `listUsersQuery.with()` or `listUsersQuery.with(undefined)`

## Reading state

```ts
const doc = query.data() // TData | undefined
const err = query.error() // TError | null
const pending = query.isPending()
const fetching = query.isFetching()
const stale = query.isStale()

// Signals for effect() / computed
query.$data.value()
query.$status.value() // 'idle' | 'pending' | 'success' | 'error'
query.$fetchStatus.value() // 'idle' | 'fetching' | 'paused'
```

Status helpers: `isSuccess()`, `isError()`, `isIdle()`, `isFirstPending()`,
`isRefetching()`, `hasData()`, `hasError()`.

## `withStore`

Bind params from a store instead of inline signals:

```ts
import { createStore } from '@echojs-ecosystem/store'

const $filter = createStore({ userId: 1 })
const posts = getUserPostsQuery.withStore($filter, (s) => ({
  userId: s.userId,
}))
```

## Docs article pattern

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
await user.refetch()
user.invalidate()
user.cancel({ reason: 'navigate-away' })
user.remove() // drop from cache
```

## Related

- [Query Definitions](/docs/packages/async/guides/query-definitions)
- [Examples: Query Demo Model](/docs/packages/async/examples/query-demo-model)
- [Examples: View Status Helpers](/docs/packages/async/examples/status-helpers)
