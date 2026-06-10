---
title: Mutations
description:
  createMutation — optimistic updates, rollback, and running mutations from
  models.
package: '@echojs-ecosystem/async'
---

# Mutations

**Mutations** handle write operations — POST, PUT, DELETE — with lifecycle hooks
and optional optimistic cache updates.

## Definition

```ts
import { createMutation } from '@echojs-ecosystem/async'

export const createPostMutation = createMutation({
  name: 'create-post',
  mutationFn: ({ variables, signal }) =>
    jpFetch('/posts', {
      method: 'POST',
      body: JSON.stringify(variables),
      signal,
    }),
  onMutate: async ({ variables, queryClient }) => {
    const previous = queryClient.getQueryData(getUserPostsQuery, {
      userId: variables.userId,
    })
    // optimistic update...
    return { previous }
  },
  onError: (_ctx, _err, rollback) => {
    // rollback?.previous
  },
})
```

Definitions use **`mutationFn`**, not `mutation`.

## Running from a model

```ts
const createPost = createPostMutation.create()

await createPost.run({ userId: 1, title: 'Hello' })
createPost.isPending()
createPost.cancel()
```

## Lifecycle hooks

| Hook        | When                                          |
| ----------- | --------------------------------------------- |
| `onMutate`  | Before `mutationFn` — return rollback context |
| `onSuccess` | After successful mutation                     |
| `onError`   | On failure — receives rollback context        |
| `onSettled` | Always — success or error                     |

## Options

| Field                        | Description                                          |
| ---------------------------- | ---------------------------------------------------- |
| `mutationFn`                 | `(ctx) => Promise<TData>` — `variables`, `signal`, … |
| `retry` / `retryDelay`       | Same as queries                                      |
| `abortController` / `signal` | Abort wiring                                         |

## Instance API

| Member                                                     | Description        |
| ---------------------------------------------------------- | ------------------ |
| `.create({ client? })`                                     | `MutationInstance` |
| `run(variables, options?)`                                 | Execute mutation   |
| `data()`, `error()`, `variables()`, `status()`             | State              |
| `isPending()`, `isSuccess()`, …                            | Helpers            |
| `reset()` / `cancel()`                                     | Control            |
| `$data`, `$error`, `$variables`, `$status`, `$abortSignal` | Signals            |

## Guidelines

| Do                                        | Avoid                               |
| ----------------------------------------- | ----------------------------------- |
| Invalidate related queries in `onSuccess` | Manually refetching every list      |
| Return rollback context from `onMutate`   | Optimistic updates without rollback |
| Pass `signal` to fetch                    | Ignoring abort on navigation        |

## Related

- [QueryClient & Cache](/docs/packages/async/guides/query-client)
- [API: createMutation](/docs/packages/async/api/create-mutation)
- [Abort & Cancellation](/docs/packages/async/guides/abort-and-cancellation)
