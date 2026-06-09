---
title: scroll
description: Scroll offset and short-lived `isScrolling` flag.
package: '@echojs-ecosystem/utils'
keywords: [scroll, utils]
---

@echojs-ecosystem/utils/scroll

## Usage

```ts
import { scroll } from '@echojs-ecosystem/utils/scroll'

const pos = scroll(window, { idleTimeout: 150 })
pos.x()
pos.y()
pos.isScrolling()
pos.dispose()
```

## Type Declarations

```ts
export type ScrollTarget = Window | HTMLElement | Document | null | undefined

export interface ScrollOptions {
  idleTimeout?: number
}

export const scroll: (
  target?: MaybeSignalOrGetter<ScrollTarget>,
  options?: ScrollOptions,
) => {
  x: () => number
  y: () => number
  isScrolling: () => boolean
  $x: Signal<number>
  $y: Signal<number>
  $isScrolling: Signal<boolean>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | `MaybeSignalOrGetter<ScrollTarget>` | `defaultWindow` | Scroll container |
| `options.idleTimeout` | `number` | `150` | ms until `isScrolling` becomes false |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `x()`, `y()` | `number` | Scroll offset |
| `isScrolling()` | `boolean` | `true` while scrolling, then idle timeout |
| `dispose()` | `void` | Remove listener and idle timer |
