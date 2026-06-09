---
title: hover
description: Whether the pointer is over an element.
package: '@echojs-ecosystem/utils'
keywords: [hover, utils]
---

@echojs-ecosystem/utils/hover

## Usage

```ts
import { hover } from '@echojs-ecosystem/utils/hover'

const isOver = hover($button)
isOver.value()
isOver.dispose()
```

## Type Declarations

```ts
export type HoverTarget = HTMLElement | null | undefined

export const hover: (target: MaybeSignalOrGetter<HoverTarget>) => {
  value: () => boolean
  $value: Signal<boolean>
  dispose: () => void
}
```

## API

### Returns

`hover()` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `boolean` | Pointer is over element |
| `dispose()` | `void` | Remove hover listeners |
