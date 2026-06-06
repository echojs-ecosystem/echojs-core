---
title: createMutation
description: createMutation(options, meta?) — define a write operation with lifecycle hooks.
package: "@echojs-ecosystem/query"
---

# createMutation

```ts
function createMutation<TData, TVariables, TError, TContext>(
  options: MutationOptions<TData, TVariables, TError, TContext>,
  meta?: { provider?: QueryProvider | null },
): MutationDefinition<TData, TVariables, TError, TContext>
```

## MutationOptions

| Field | Description |
| --- | --- |
| `mutationFn` | `(ctx) => Promise<TData>` — `variables`, `signal`, … |
| `onMutate` / `onSuccess` / `onError` / `onSettled` | Lifecycle |
| `retry` / `retryDelay` | Same as queries |
| `abortController` / `signal` | Abort wiring |

## MutationDefinition / MutationInstance

| Member | Description |
| --- | --- |
| `.create({ client? })` | `MutationInstance` |
| `run(variables, options?)` | Execute mutation |
| `data()`, `error()`, `variables()`, `status()` | State |
| `isPending()`, `isSuccess()`, … | Helpers |
| `reset()` / `cancel()` | Control |
| `$data`, `$error`, `$variables`, `$status`, `$abortSignal` | Signals |

## See also

- [Guides: Mutations](/docs/packages/query/guides/mutations)
- [Guides: Abort & Cancellation](/docs/packages/query/guides/abort-and-cancellation)
