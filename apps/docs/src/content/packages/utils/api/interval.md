---
title: interval
description: Repeating interval callback.
package: '@echojs-ecosystem/utils'
keywords: [interval, utils]
---

@echojs-ecosystem/utils/interval

## Usage

```ts
import { interval } from '@echojs-ecosystem/utils/interval'

const tick = interval(() => poll(), 5000)
tick.start()
tick.stop()
tick.dispose()
```

## Type Declarations

```ts
export const interval: (callback: () => void, delay: number) => {
  start: () => void
  stop: () => void
  active: () => boolean
  $active: Signal<boolean>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `callback` | `() => void` | — | Runs every `delay` ms |
| `delay` | `number` | — | Interval in ms |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `start()` / `stop()` | `void` | Control interval |
| `active()` | `boolean` | Interval is running |
| `dispose()` | `void` | Clear interval |
