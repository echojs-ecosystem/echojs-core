---
title: mouse
description: Track pointer position from `mousemove` and `touchmove`.
package: '@echojs-ecosystem/utils'
keywords: [mouse, utils]
---

@echojs-ecosystem/utils/mouse

## Usage

```ts
import { mouse } from '@echojs-ecosystem/utils/mouse'

const pointer = mouse()
pointer.x()
pointer.y()
pointer.sourceType() // 'mouse' | 'touch' | 'pen' | null
pointer.dispose()
```

## Type Declarations

```ts
export interface MouseOptions {
  document?: Document
}

export const mouse: (options?: MouseOptions) => {
  x: () => number
  y: () => number
  sourceType: () => MouseSourceType
  $x: Signal<number>
  $y: Signal<number>
  $sourceType: Signal<MouseSourceType>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `options.document` | `Document` | `defaultDocument` | Document to listen on |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `x()`, `y()` | `number` | `clientX` / `clientY` |
| `sourceType()` | `MouseSourceType` | mouse \| touch \| pen \| null |
| `dispose()` | `void` | Remove move listeners |
