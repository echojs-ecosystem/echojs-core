---
title: devicePixelRatio
description: Reactive `window.devicePixelRatio`.
package: '@echojs-ecosystem/utils'
keywords: [devicePixelRatio, utils]
---

@echojs-ecosystem/utils/device-pixel-ratio

## Usage

```ts
import { devicePixelRatio } from '@echojs-ecosystem/utils/device-pixel-ratio'

const dpr = devicePixelRatio({ initial: 1 })
dpr.value()
dpr.dispose()
```

## Type Declarations

```ts
export interface DevicePixelRatioOptions {
  window?: Window
  initial?: number
}

export const devicePixelRatio: (options?: DevicePixelRatioOptions) => {
  value: () => number
  $value: Signal<number>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `options.window` | `Window` | `defaultWindow` | Target window |
| `options.initial` | `number` | `1` | SSR default |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `number` | Current DPR |
| `dispose()` | `void` | Remove `resize` listener |
