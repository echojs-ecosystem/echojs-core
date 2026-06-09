---
title: debounce
description: Debounce a signal or a function.
package: '@echojs-ecosystem/utils'
keywords: [debounce, utils]
---

@echojs-ecosystem/utils/debounce

## Usage

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { debounce, debounceFn } from '@echojs-ecosystem/utils/debounce'

const $q = signal('')
const debounced = debounce($q, 300)

const search = debounceFn((q: string) => fetch(q), 300)
search.flush()
```

## Type Declarations

```ts
export const debounce: <T>(source: ReadonlySignal<T>, ms: number) => {
  value: () => T
  $value: Signal<T>
  dispose: () => void
}

export type DebouncedFn<T extends (...args: never[]) => void> = T & {
  cancel(): void
  flush(): void
}

export const debounceFn: <T extends (...args: never[]) => void>(
  fn: T,
  ms: number,
) => DebouncedFn<T>
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `debounce(source, ms)` | — | — | Debounces signal updates |
| `debounceFn(fn, ms)` | — | — | Debounces function calls |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `T` | Debounced signal value |
| `debounceFn.cancel()` | `void` | Drop pending call |
| `debounceFn.flush()` | `void` | Run pending call immediately |
| `dispose()` | `void` | Cancel timers / stop effect |

### SSR

On server, updates apply immediately (no timer).
