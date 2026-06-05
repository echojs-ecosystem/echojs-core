---
title: API Reference
description: Complete @echojs/reactivity public API — signal, computed, effect, batch, scope, cleanup, readonly.
package: "@echojs/reactivity"
---

# API Reference

Public exports from `@echojs/reactivity`:

```ts
import {
  signal,
  computed,
  effect,
  batch,
  scope,
  cleanup,
  readonly,
  isSignal,
  isReadonlySignal,
} from "@echojs/reactivity";

import type { Signal, ReadonlySignal, ReadValue, DeepReadonly } from "@echojs/reactivity";
```

## `signal(initial)`

Creates a **writable** signal. **`initial` is required** — calling `signal()` with no argument throws `TypeError`.

| Method | Description |
| --- | --- |
| `.value()` | Read with dependency tracking |
| `.peek()` | Read without tracking |
| `.set(next)` | Replace value |
| `.update(fn)` | `fn(previous)` → next value |
| `.subscribe(fn)` | Notify on change; returns `unsubscribe` |
| `.readonly()` | Readonly facade (no set/update) |

**Subscribe:** listener runs only when `Object.is(prev, next)` is false; **not** invoked immediately on subscribe.

## `computed(getter)`

Creates a **readonly** derived signal. `getter` must be a function or `TypeError` is thrown.

| Method | Description |
| --- | --- |
| `.value()` | Read (tracks deps, may recompute) |
| `.peek()` | Read without tracking |
| `.subscribe(fn)` | Same change-only contract as `signal` |

No `.set()` / `.update()`.

## `effect(fn)`

Runs `fn` **synchronously**, then re-runs when dependencies read via `.value()` inside `fn` change. Returns **disposer** `() => void`.

`fn` must be a function or `TypeError` is thrown.

## `batch(fn)`

Runs `fn`, batches reactive notifications until `fn` completes, returns `fn()`’s return value. `fn` must be a function.

## `scope(fn)`

Starts an effect scope. Returns disposer that tears down effects created inside and runs registered `cleanup()` callbacks.

`fn` must be a function.

## `cleanup(fn)`

Registers `fn` to run when the current `scope()` disposes. **Must** be called inside an active scope or throws:

```
cleanup(fn) must be called inside scope()
```

`fn` must be a function.

## `readonly(sig)`

Returns a readonly view of a writable or readonly signal. Strips `.set()` / `.update()` from the type surface.

## `isSignal(value)`

Type guard: branded writable or readonly signal instances from this package.

## `isReadonlySignal(value)`

Type guard: readonly/branded computed-style signals.

## Types

### `Signal<T>`

Writable signal interface extending read methods with `set`, `update`, `readonly`.

### `ReadonlySignal<T>`

Read + `subscribe` only.

### `ReadValue<T>`

Result of `.value()` / `.peek()`:

- Primitives: `T`
- Objects/arrays: `DeepReadonly<T>` (recursive readonly fields)

### `DeepReadonly<T>`

Utility type for immutable reads — prevents `user.tags.push(...)` on values from `.value()`.

## Errors (summary)

| Call | Error |
| --- | --- |
| `signal()` | `TypeError: signal(initial) expects 1 argument` |
| `computed(x)` non-function | `TypeError: computed(getter) expects a function` |
| `effect(x)` non-function | `TypeError: effect(fn) expects a function` |
| `batch(x)` non-function | `TypeError: batch(fn) expects a function` |
| `scope(x)` non-function | `TypeError: scope(fn) expects a function` |
| `cleanup(x)` non-function | `TypeError: cleanup(fn) expects a function` |
| `cleanup()` outside scope | `Error: cleanup(fn) must be called inside scope()` |
| `subscribe(x)` non-function | `TypeError: subscribe(fn) expects a function` |

## Dev-only behavior

When `NODE_ENV !== "production"`, object/array values assigned via `.set()` / `.update()` are **deep-frozen** after write. In-place mutation throws at runtime (typically `TypeError` in strict mode).

## Not exported (by design)

- `trigger()` — manual invalidation without `.set()`
- Engine internals (`alien-signals` direct access)

## Related

- Usage guide — `/docs/packages/reactivity/usage`
- Package overview — `/docs/packages/reactivity`
