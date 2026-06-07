---
title: Show
description: Show(condition, then, else?) — conditional dynamic region.
package: '@echojs-ecosystem/hyperdom'
---

# Show

```ts
function Show(
  condition: () => boolean,
  then: () => Child,
  fallback?: () => Child
): () => Child
```

Returns a **dynamic child** that re-evaluates `condition()` and renders `then()`
or `fallback()` on each update.

## Parameters

| Param       | Type                   |
| ----------- | ---------------------- |
| `condition` | `() => boolean`        |
| `then`      | `() => Child`          |
| `fallback`  | optional `() => Child` |

Omit `fallback` for no else branch (`null`).

## Example

```ts
import { Show } from '@echojs-ecosystem/hyperdom'

Show(
  () => $loggedIn.value(),
  () => dashboard(),
  () => loginForm()
)
```

Use as a child in a parent tree:

```ts
article(null, [
  Show(
    () => vm.$count.value() > 0,
    () => p(null, 'Positive')
  ),
])
```

## See also

- [Guides: Show & List](/docs/packages/hyperdom/guides/show-and-list)
- [Examples: Conditional UI](/docs/packages/hyperdom/examples/conditional-ui)
