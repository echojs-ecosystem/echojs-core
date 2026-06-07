---
title: List
description: List(source, renderItem) — collection dynamic region.
package: '@echojs-ecosystem/hyperdom'
---

# List

```ts
function List<T>(
  source: { value(): readonly T[] } | (() => readonly T[]),
  renderItem: (item: T, index: () => number) => Child
): () => Child
```

Returns a **dynamic child** that re-renders when reactive dependencies in
`source` or `renderItem` change.

## Parameters

| Param        | Type                                                                   |
| ------------ | ---------------------------------------------------------------------- |
| `source`     | Signal-like `{ value(): readonly T[] }` or getter `() => readonly T[]` |
| `renderItem` | `(item: T, index: () => number) => Child`                              |

`index` is a getter function — call `index()` inside reactive children.

## Example

```ts
import { List } from '@echojs-ecosystem/hyperdom'
import { signal } from '@echojs-ecosystem/reactivity'

const $items = signal(['Todo', 'Done'])

ul(
  null,
  List($items, (label, index) => li(null, () => `${index()}: ${label}`))
)
```

## Performance note

Current `List` re-renders the full list when the array reference or tracked
contents change. Keyed diff optimization is planned.

## See also

- [Guides: Show & List](/docs/packages/hyperdom/guides/show-and-list)
- [Examples: Todo List](/docs/packages/hyperdom/examples/todo-list)
