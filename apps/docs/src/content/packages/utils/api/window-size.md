---
title: windowSize
description: Reactive viewport width and height from `resize` events.
package: '@echojs-ecosystem/utils'
keywords: [windowSize, utils]
---

@echojs-ecosystem/utils/window-size

## Usage

```ts
import { windowSize } from '@echojs-ecosystem/utils/window-size'

const size = windowSize({ initialWidth: 0, initialHeight: 0 })
size.width()
size.height()
size.dispose()
```

## Type Declarations

```ts
export interface WindowSizeOptions {
  initialWidth?: number
  initialHeight?: number
  window?: Window
}

export const windowSize: (options?: WindowSizeOptions) => {
  width: () => number
  height: () => number
  $width: Signal<number>
  $height: Signal<number>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `options.initialWidth` | `number` | `0` | SSR / pre-hydration width |
| `options.initialHeight` | `number` | `0` | SSR / pre-hydration height |
| `options.window` | `Window` | `defaultWindow` | Custom window reference |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `width()` | `number` | Current inner width |
| `height()` | `number` | Current inner height |
| `$width` | `Signal<number>` | Reactive width |
| `$height` | `Signal<number>` | Reactive height |
| `dispose()` | `void` | Remove `resize` listener |

### SSR

No `resize` listener on the server — uses `initialWidth` / `initialHeight`.
