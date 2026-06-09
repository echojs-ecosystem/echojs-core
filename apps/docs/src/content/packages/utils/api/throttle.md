---
title: throttle
description: Throttle a signal or a function.
package: '@echojs-ecosystem/utils'
keywords: [throttle, utils]
---

@echojs-ecosystem/utils/throttle

## Usage

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { throttle, throttleFn } from '@echojs-ecosystem/utils/throttle'

const $y = signal(0)
const throttled = throttle($y, 100)

const onScroll = throttleFn(() => save(), 100)
```

## Type Declarations

```ts
export const throttle: <T>(source: ReadonlySignal<T>, ms: number) => {
  value: () => T
  $value: Signal<T>
  dispose: () => void
}

export type ThrottledFn<T extends (...args: never[]) => void> = T & {
  cancel(): void
  flush(): void
}

export const throttleFn: <T extends (...args: never[]) => void>(
  fn: T,
  ms: number,
) => ThrottledFn<T>
```

## API

### Returns

`throttle()` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `T` | Throttled signal value |
| `throttleFn.cancel()` / `flush()` | `void` | Control pending invocation |
| `dispose()` | `void` | Cancel timers / stop effect |

### SSR

On server, updates apply immediately.
