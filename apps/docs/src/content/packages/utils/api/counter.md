---
title: counter
description: Numeric counter with optional min/max clamp.
package: '@echojs-ecosystem/utils'
keywords: [counter, utils]
---

@echojs-ecosystem/utils/counter

## Usage

```ts
import { counter } from '@echojs-ecosystem/utils/counter'

const page = counter(1, { min: 1, max: 10 })
page.inc()
page.dec(2)
page.reset()
```

## Type Declarations

```ts
export interface CounterOptions {
  min?: number
  max?: number
}

export const counter: (initial?: number, options?: CounterOptions) => {
  value: () => number
  inc: (step?: number) => void
  dec: (step?: number) => void
  set: (next: number) => void
  reset: () => void
  $value: Signal<number>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `initial` | `number` | `0` | Starting value |
| `options.min` / `max` | `number` | — | Clamp bounds |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `inc(step?)` / `dec(step?)` | `void` | Add / subtract (default 1) |
| `set(n)` | `void` | Set clamped value |
| `reset()` | `void` | Back to initial |
