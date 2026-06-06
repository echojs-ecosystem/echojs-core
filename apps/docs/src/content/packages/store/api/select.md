---
title: select
description: select(store, selector, options?) — derived readonly store from one source.
package: "@echojs-ecosystem/store"
---

# select

```ts
function select<State, Selected>(
  store: Store<State> | ReadonlyStore<State>,
  selector: (state: State) => Selected,
  options?: SelectOptions<Selected>,
): ReadonlyStore<Selected>
```

Creates a **readonly derived store** that recomputes when the source changes.

## Options

Same `name` and `equals` shape as [createStore](/docs/packages/store/api/create-store).

## Instance API

| Member | Description |
| --- | --- |
| `kind` | `"readonly-store"` |
| `name` | Optional |
| `value()` | Current derived state |
| `$value` | `ReadonlySignal<Selected>` |
| `changed` | Store event |
| `subscribe(listener)` | Unsubscribe return |

No `set`, `update`, or `reset`.

## Example

```ts
import { createStore, select } from "@echojs-ecosystem/store";

const userStore = createStore({ id: "1", name: "Vova" });
const userName = select(userStore, (user) => user.name, { name: "user-name" });
```

## See also

- [Guides: Derived State](/docs/packages/store/guides/derived-state)
- [API: combine](/docs/packages/store/api/combine)
