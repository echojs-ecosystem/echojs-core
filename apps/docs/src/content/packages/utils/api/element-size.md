---
title: elementSize
description: Element width and height via `ResizeObserver`.
package: '@echojs-ecosystem/utils'
keywords: [elementSize, utils]
---

@echojs-ecosystem/utils/element-size

## Usage

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { elementSize } from '@echojs-ecosystem/utils/element-size'

const $el = signal<HTMLDivElement | null>(null)
const size = elementSize($el)
size.width()
size.height()
size.dispose()
```

## Type Declarations

```ts
export type ElementTarget = HTMLElement | null | undefined

export const elementSize: (target: MaybeSignalOrGetter<ElementTarget>) => {
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
| `target` | `MaybeSignalOrGetter<ElementTarget>` | — | Element to measure |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `width()` / `height()` | `number` | Content dimensions |
| `dispose()` | `void` | Disconnect observer |
