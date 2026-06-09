---
title: focus
description: Focus state and imperative `focus()` / `blur()`.
package: '@echojs-ecosystem/utils'
keywords: [focus, utils]
---

@echojs-ecosystem/utils/focus

## Usage

```ts
import { focus } from '@echojs-ecosystem/utils/focus'

const input = focus($ref)
input.focused()
input.focus()
input.dispose()
```

## Type Declarations

```ts
export type FocusTarget = HTMLElement | null | undefined

export const focus: (target: MaybeSignalOrGetter<FocusTarget>) => {
  focused: () => boolean
  $focused: Signal<boolean>
  focus: () => void
  blur: () => void
  dispose: () => void
}
```

## API

### Returns

`focus()` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| `focused()` | `boolean` | Element has focus |
| `focus()` / `blur()` | `void` | Imperative focus control |
| `dispose()` | `void` | Remove focus listeners |

### Related

- [activeElement](/docs/packages/utils/api/active-element)
