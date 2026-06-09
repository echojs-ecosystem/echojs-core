---
title: hotkeys
description: Listen for keyboard shortcut combos (`ctrl+s`, `meta+k`, …).
package: '@echojs-ecosystem/utils'
keywords: [hotkeys, utils]
---

@echojs-ecosystem/utils/hotkeys

## Usage

```ts
import { hotkeys } from '@echojs-ecosystem/utils/hotkeys'

const hk = hotkeys('ctrl+s', (e) => save(), { preventDefault: true })
hk.dispose()
```

## Type Declarations

```ts
export interface HotkeysOptions {
  preventDefault?: boolean
  target?: Document | Window
}

export const hotkeys: (
  keys: string | string[],
  handler: (event: KeyboardEvent) => void,
  options?: HotkeysOptions,
) => { dispose: () => void }
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `keys` | `string \| string[]` | — | Combo strings to match |
| `handler` | `(event) => void` | — | Called on match |
| `options.preventDefault` | `boolean` | `false` | Call `preventDefault` on match |
| `options.target` | `Document \| Window` | document/window | Event target |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `dispose()` | `void` | Remove `keydown` listener |
