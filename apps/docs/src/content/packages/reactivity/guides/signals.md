---
title: Signals
description:
  Writable reactive cells — read, write, subscribe, and naming conventions.
package: '@echojs-ecosystem/reactivity'
---

# Signals

A **signal** is a mutable reactive cell. Reads via `.value()` track dependents;
writes via `.set()` / `.update()` notify subscribers when the value actually
changes.

## Create and use

```ts
import { signal } from '@echojs-ecosystem/reactivity'

const $count = signal(0)

$count.value() // read (tracks dependents)
$count.peek() // read without tracking
$count.set(10)
$count.update((n) => n + 1)
```

**`initial` is required** — calling `signal()` with no argument throws
`TypeError`.

## API surface

| Method           | Description                             |
| ---------------- | --------------------------------------- |
| `.value()`       | Read with dependency tracking           |
| `.peek()`        | Read without tracking                   |
| `.set(next)`     | Replace value                           |
| `.update(fn)`    | `fn(previous)` → next value             |
| `.subscribe(fn)` | Notify on change; returns `unsubscribe` |
| `.readonly()`    | Readonly facade (no set/update)         |

## Subscribe contract

- Fires **only when the value changes** (`Object.is`)
- Does **not** call the listener on subscribe — run your logic once yourself if
  needed:

```ts
const log = () => console.log($count.peek())
log()
const stop = $count.subscribe(log)
```

## When to use signals

- Local UI state in models (`$tab`, `$isOpen`)
- Shared writable state before wrapping in a store
- Primitive or immutable object snapshots

## When to reach for computed instead

If the value is **purely derived** from other signals, use
[Computed Values](/docs/packages/reactivity/guides/computed) — it caches and
avoids manual sync.

## Related

- [Readonly Signals](/docs/packages/reactivity/guides/readonly-signals)
- [API: signal](/docs/packages/reactivity/api/signal)
