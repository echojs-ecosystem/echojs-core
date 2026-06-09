---
title: clickOutside
description: Call handler when pointer down occurs outside the target.
package: '@echojs-ecosystem/utils'
keywords: [clickOutside, utils]
---

@echojs-ecosystem/utils/click-outside

## Usage

```ts
import { clickOutside } from '@echojs-ecosystem/utils/click-outside'

const dismiss = clickOutside($panel, () => close())
dismiss.dispose()
```

## Type Declarations

```ts
export type ClickOutsideTarget = HTMLElement | null | undefined

export const clickOutside: (
  target: MaybeSignalOrGetter<ClickOutsideTarget>,
  handler: (event: MouseEvent | TouchEvent) => void,
) => { dispose: () => void }
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | `MaybeSignalOrGetter<HTMLElement>` | — | Inside boundary |
| `handler` | `(event) => void` | — | Outside click handler |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `dispose()` | `void` | Remove document listeners |
