---
title: Readonly Stores
description: readonly() views and withReadonly() locks — two ways to prevent mutation.
package: "@echojs-ecosystem/store"
---

# Readonly Stores

EchoJS Store offers two readonly patterns with different semantics: a **separate readonly view** and **in-place mutation lock**.

## `readonly(store)` — separate view

Returns a **ReadonlyStore** that mirrors changes but has no `set` / `update` / `reset`:

```ts
import { createStore, readonly } from "@echojs-ecosystem/store";

const counter = createStore(0);
const view = readonly(counter);

view.value(); // tracks counter
view.subscribe((v) => {});
// view.set(1) — not available
```

Use when you want to **export read access** without exposing mutation — e.g. pass a readonly view to a child module while keeping the writable store private.

## `withReadonly()` — lock in place

Locks mutation on the **same** store instance. `set`, `update`, and `reset` throw; `kind` becomes `"readonly-store"`:

```ts
const locked = createStore(0).extend(withReadonly());

locked.value(); // OK
locked.set(1);  // throws
```

Use when the store should never be mutated after initialization — e.g. configuration snapshots loaded once at boot.

## Derived stores are already readonly

`select` and `combine` return **ReadonlyStore** instances. They have `value()`, `$value`, `changed`, and `subscribe` — but no mutation methods.

## Comparison

| Approach | Same instance? | Mutation blocked? | Use case |
| --- | --- | --- | --- |
| `readonly(store)` | No — new view | On the view only | Export read-only API |
| `withReadonly()` | Yes | On the store itself | Freeze after setup |
| `select` / `combine` | N/A — derived | Always readonly | Computed state |

## Related

- [Derived State](/docs/packages/store/guides/derived-state)
- [API: readonly](/docs/packages/store/api/readonly)
- [Reactivity: Readonly Signals](/docs/packages/reactivity/guides/readonly-signals)
