---
title: readonly
description: readonly(store) — create a ReadonlyStore view without mutation methods.
package: "@echojs-ecosystem/store"
---

# readonly

```ts
function readonly<State>(store: Store<State>): ReadonlyStore<State>
```

Returns a separate **ReadonlyStore** that mirrors the source store's changes but has no `set`, `update`, or `reset`.

## ReadonlyStore instance

| Member | Description |
| --- | --- |
| `kind` | `"readonly-store"` |
| `name` | Optional |
| `value()` | Current state |
| `$value` | `ReadonlySignal<State>` |
| `changed` | Store event |
| `subscribe(listener)` | Unsubscribe return |

## vs `withReadonly()`

| | `readonly(store)` | `withReadonly()` |
| --- | --- | --- |
| Instance | New readonly view | Same instance, locked |
| Writable source | Still mutable | Throws on mutation |

## Example

```ts
import { createStore, readonly } from "@echojs-ecosystem/store";

const counter = createStore(0);
const view = readonly(counter);

view.value();
view.subscribe((v) => {});
```

## See also

- [Guides: Readonly Stores](/docs/packages/store/guides/readonly)
- [API: Extensions](/docs/packages/store/api/extensions)
