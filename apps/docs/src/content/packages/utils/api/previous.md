---
title: previous
description: Previous value of a source signal.
package: '@echojs-ecosystem/utils'
keywords: [previous, utils]
---

@echojs-ecosystem/utils/previous

## Usage

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { previous } from '@echojs-ecosystem/utils/previous'

const $n = signal(1)
const prev = previous($n)
$n.set(2)
prev.value() // 1
prev.dispose()
```

## Type Declarations

```ts
export const previous: <T>(source: ReadonlySignal<T>) => {
  value: () => T | undefined
  $value: Signal<T | undefined>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `source` | `ReadonlySignal<T>` | — | Signal to track |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `T \| undefined` | Previous value (`undefined` on first run) |
| `dispose()` | `void` | Stop effect |
