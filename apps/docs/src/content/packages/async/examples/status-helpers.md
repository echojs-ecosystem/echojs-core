---
title: View Status Helpers
description: Show + isPending, isError, hasData patterns for query-driven views.
package: '@echojs-ecosystem/async'
---

# View Status Helpers

Views should never call `fetch` directly. Use query instance status helpers with
HyperDOM `Show` for loading, error, and success states.

## Problem

Render loading spinner, error message, or data based on query status — without
nested `if` chains that break reactivity.

## View pattern

```ts
import { Show } from '@echojs-ecosystem/hyperdom'
import { p } from '@echojs-ecosystem/hyperdom'

Show(
  () => user.isPending(),
  () => p(null, 'Loading user…')
)
Show(
  () => user.isError(),
  () => p(null, () => String(user.error()))
)
Show(
  () => user.hasData(),
  () => p(null, () => user.data()!.name)
)
```

## Available helpers

| Helper             | Meaning                                      |
| ------------------ | -------------------------------------------- |
| `isPending()`      | First load in progress                       |
| `isFetching()`     | Any fetch in progress (including background) |
| `isFirstPending()` | Initial load only                            |
| `isRefetching()`   | Background refetch while showing data        |
| `isError()`        | Last fetch failed                            |
| `isSuccess()`      | Has successful data                          |
| `hasData()`        | Data is defined                              |
| `hasError()`       | Error is defined                             |
| `isStale()`        | Data needs refresh per `staleTime`           |

## Signals alternative

For non-Show patterns, read `query.$status.value()` or
`query.$fetchStatus.value()` inside reactive children.

## See also

- [Guides: Reactive Binding](/docs/packages/async/guides/reactive-binding)
- [HyperDOM: Show](/docs/packages/hyperdom/guides/show-and-list)
