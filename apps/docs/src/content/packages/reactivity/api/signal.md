---
title: signal
description: signal(initial) — create a writable reactive cell.
package: "@echojs-ecosystem/reactivity"
---

# signal

```ts
function signal<T>(initial: T): Signal<T>
```

Creates a **writable** signal. **`initial` is required** — calling `signal()` with no argument throws `TypeError`.

## Methods

| Method | Description |
| --- | --- |
| `.value()` | Read with dependency tracking |
| `.peek()` | Read without tracking |
| `.set(next)` | Replace value |
| `.update(fn)` | `fn(previous)` → next value |
| `.subscribe(fn)` | Notify on change; returns `unsubscribe` |
| `.readonly()` | Readonly facade (no set/update) |

## Example

```ts
import { signal } from "@echojs-ecosystem/reactivity";

const $count = signal(0);
$count.set(1);
$count.update((n) => n + 1);
```

## Subscribe contract

Listener runs only when `Object.is(prev, next)` is false; **not** invoked immediately on subscribe.

## Errors

| Call | Error |
| --- | --- |
| `signal()` | `TypeError: signal(initial) expects 1 argument` |
| `.subscribe(x)` non-function | `TypeError: subscribe(fn) expects a function` |

## See also

- [Guides: Signals](/docs/packages/reactivity/guides/signals)
- [Types: Signal](/docs/packages/reactivity/api/types)
