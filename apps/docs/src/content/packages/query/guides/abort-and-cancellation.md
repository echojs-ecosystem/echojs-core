---
title: Abort & Cancellation
description:
  AbortController wiring, cancel/refetch options, and race-condition prevention.
package: '@echojs-ecosystem/query'
---

# Abort & Cancellation

EchoJS Query assigns an **AbortController** to each fetch by default. Pass
`signal` to `fetch` in `queryFn` so in-flight requests cancel when params change
or the user navigates away.

## Default behavior

```ts
queryFn: ({ signal }) => fetch("/users", { signal }).then((r) => r.json()),
```

`abortPrevious: true` (default) cancels the previous fetch when params change.

## Route-bound signal

Bind an external abort signal for route leave:

```ts
const routeBound = getUserQuery.with(() => ({ id: $id.value() }), {
  signal: () => routeAc.signal,
})
```

## Manual abort

```ts
await user.refetch({ abortController: new AbortController() })
user.abort('user-cancelled')
user.cancel({ reason: 'navigate-away', silent: true })
```

## Abort API

| API                                   | Role                                     |
| ------------------------------------- | ---------------------------------------- |
| `abortController()` / `abortSignal()` | Current in-flight handles                |
| `abort(reason)`                       | Abort active fetch                       |
| `cancel(options)`                     | Cancel with optional `silent` / `reason` |
| `$abortSignal`                        | Reactive signal                          |

Same options work on `createMutation` / `createInfiniteQuery`.

## CancelledError

Use `isCancelledError(err)` to distinguish user cancellation from real failures
— avoid showing error UI for aborted requests.

## Guidelines

| Do                                           | Avoid                                  |
| -------------------------------------------- | -------------------------------------- |
| Pass `signal` to every `fetch`               | Ignoring abort → stale data races      |
| Bind route signal on page queries            | Letting fetches complete after unmount |
| Use `cancel({ silent: true })` on navigation | Treating abort as application error    |

## Related

- [Query Definitions](/docs/packages/query/guides/query-definitions)
- [API: Utilities](/docs/packages/query/api/utilities)
- [Mutations](/docs/packages/query/guides/mutations)
