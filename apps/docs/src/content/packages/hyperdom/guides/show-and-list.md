---
title: Show & List
description: Conditional UI and collection rendering with Show and List helpers.
package: '@echojs-ecosystem/hyperdom'
---

# Show & List

`Show` and `List` return **dynamic children** — function regions that
re-evaluate when reactive dependencies inside their callbacks change.

## `Show` — conditional UI

```ts
import { Show } from '@echojs-ecosystem/hyperdom'

Show(
  () => $loggedIn.value(),
  () => dashboard(),
  () => loginForm()
)
```

| Argument       | Type            | Role                |
| -------------- | --------------- | ------------------- |
| 1st            | `() => boolean` | Condition           |
| 2nd            | `() => Child`   | Content when true   |
| 3rd (optional) | `() => Child`   | Fallback when false |

Returns `() => Child` — use it as a child in a parent tree. Omit the third
argument for no fallback (`null`).

See [API: Show](/docs/packages/hyperdom/api/show).

### In a view

```ts
export const CounterView = createView(
  (vm) =>
    article(null, [
      Show(
        () => vm.$count.value() > 0,
        () => p(null, 'Count is positive')
      ),
    ]),
  'CounterView'
)
```

## `List` — collections

```ts
import { List } from '@echojs-ecosystem/hyperdom'
import { signal } from '@echojs-ecosystem/reactivity'

const $items = signal(['Todo', 'Done'])

ul(
  null,
  List($items, (label, index) => li(null, () => `${index()}: ${label}`))
)
```

| Argument     | Type                                                | Role           |
| ------------ | --------------------------------------------------- | -------------- |
| `source`     | `{ value(): readonly T[] }` or `() => readonly T[]` | Reactive array |
| `renderItem` | `(item: T, index: () => number) => Child`           | Row renderer   |

`index` is a getter so list re-renders stay consistent if ordering changes.

See [API: List](/docs/packages/hyperdom/api/list).

> [!NOTE] Current `List` re-renders the full list when the array reference or
> contents trigger an update. Keyed diff optimization is planned.

## Signal or getter source

Both forms work:

```ts
List(vm.$items, renderRow) // signal with .value()
List(() => vm.filteredItems(), renderRow) // computed getter
```

## Related

- [Reactive Children](/docs/packages/hyperdom/guides/reactive-children)
- [Examples: Todo List](/docs/packages/hyperdom/examples/todo-list)
- [Examples: Conditional UI](/docs/packages/hyperdom/examples/conditional-ui)
