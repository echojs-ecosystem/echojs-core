---
title: idle
description: Detect user inactivity after a timeout.
package: '@echojs-ecosystem/utils'
keywords: [idle, utils]
---

@echojs-ecosystem/utils/idle

## Usage

```ts
import { idle } from '@echojs-ecosystem/utils/idle'

const userIdle = idle({ timeout: 60_000 })
userIdle.idle()
userIdle.reset()
userIdle.dispose()
```

## Type Declarations

```ts
export interface IdleOptions {
  timeout?: number
  initial?: boolean
}

export const idle: (options?: IdleOptions) => {
  idle: () => boolean
  active: () => boolean
  reset: () => void
  $idle: Signal<boolean>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `options.timeout` | `number` | `60000` | Idle threshold in ms |
| `options.initial` | `boolean` | `false` | Initial idle flag |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `idle()` | `boolean` | User is idle |
| `active()` | `boolean` | Inverse of `idle()` |
| `reset()` | `void` | Restart idle timer |
| `dispose()` | `void` | Remove activity listeners |
