---
title: createStore
description: createStore(initial, options?) — create a writable reactive store.
package: "@echojs-ecosystem/store"
---

# createStore

```ts
function createStore<State>(
  initial: State,
  options?: StoreOptions<State>,
): Store<State>
```

Creates a **writable store** backed by a reactive signal.

## Options

| Field | Type | Default |
| --- | --- | --- |
| `name` | `string` | — |
| `equals` | `false` \| `(a, b) => boolean` | `Object.is` |

`equals: false` — always treat updates as changes (always notify).

## Instance API

| Member | Description |
| --- | --- |
| `kind` | `"store"` |
| `name` | Optional label |
| `value()` | Current state |
| `set(value)` | Replace state (respects `equals`) |
| `update(fn)` | `set(fn(prev))` |
| `reset()` | Restore initial state; emits `reseted` |
| `$value` | `Signal<State>` |
| `changed` | `{ watch, emit }` — payload `{ value, prevValue }` |
| `reseted` | Same payload shape on reset |
| `subscribe(listener)` | `(value, prevValue) => void`; returns unsubscribe |
| `extend(extension)` | Chain extensions; merged return type |

## Example

```ts
import { createStore } from "@echojs-ecosystem/store";

const counter = createStore(0, { name: "counter" });
counter.set(10);
counter.update((v) => v + 1);
counter.reset();
```

## See also

- [Guides: Creating Stores](/docs/packages/store/guides/creating-stores)
- [Guides: Events & Subscriptions](/docs/packages/store/guides/events)
