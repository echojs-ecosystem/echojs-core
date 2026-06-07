---
title: Todo List
description: List helper rendering a signal-backed string array.
package: '@echojs-ecosystem/hyperdom'
---

# Todo List

Render a reactive collection with `List` — source can be a signal or a getter.

## Problem

Display a list of items that updates when the backing array signal changes.

## Code

```ts
import { List, ul, li } from '@echojs-ecosystem/hyperdom'
import { signal } from '@echojs-ecosystem/reactivity'

const $items = signal(['Buy milk', 'Walk dog', 'Ship feature'])

const todoList = () =>
  ul(
    null,
    List($items, (label, index) => li(null, () => `${index() + 1}. ${label}`))
  )
```

## With model VM

```ts
export const TodoView = createView(
  (vm) =>
    ul(
      null,
      List(vm.$items, (item) => li(null, () => item.label))
    ),
  'TodoView'
)
```

Use a getter source for filtered lists:

```ts
List(() => vm.visibleItems(), renderRow)
```

## Takeaways

- `index` is `() => number` — call `index()` inside reactive children
- Full list re-renders on update today — keyed diff is planned
- Pair with
  [Reactivity: Todo List](/docs/packages/reactivity/examples/todo-list) for
  immutable array updates

## Related

- [Guides: Show & List](/docs/packages/hyperdom/guides/show-and-list)
- [API: List](/docs/packages/hyperdom/api/list)
