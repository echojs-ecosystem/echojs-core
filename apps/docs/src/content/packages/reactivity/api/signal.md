---
title: signal
description: Create a writable reactive cell with `value`, `set`, and `update`.
package: '@echojs-ecosystem/reactivity'
keywords: [signal, writable, reactivity]
---

@echojs-ecosystem/reactivity

## Usage

```ts
import { signal } from '@echojs-ecosystem/reactivity'

const $count = signal(0)
$count.set(1)
$count.update((n) => n + 1)
$count.value()
```

## Type Declarations

```ts
export interface Signal<T> extends ReadonlySignal<T> {
  set(next: T): void
  update(fn: (prev: T) => T): void
  readonly(): ReadonlySignal<T>
}

export const signal: <T>(initial: T) => Signal<T>
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `initial` | `T` | — | Required starting value; `signal()` without args throws |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `.value()` | `ReadValue<T>` | Read with dependency tracking |
| `.peek()` | `ReadValue<T>` | Read without tracking |
| `.set(next)` | `void` | Replace value |
| `.update(fn)` | `void` | Set from previous value |
| `.subscribe(fn)` | `() => void` | Change listener; not called on subscribe |
| `.readonly()` | `ReadonlySignal<T>` | Readonly facade without set/update |

### Related

- [computed](/docs/packages/reactivity/api/computed)
- [Types](/docs/packages/reactivity/api/types)
