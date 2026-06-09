---
title: keyPress
description: Track whether a single key is currently held.
package: '@echojs-ecosystem/utils'
keywords: [keyPress, utils]
---

@echojs-ecosystem/utils/key-press

## Usage

```ts
import { keyPress } from '@echojs-ecosystem/utils/key-press'

const space = keyPress(' ', () => console.log('space'))
space.pressed()
space.dispose()
```

## Type Declarations

```ts
export interface KeyPressOptions {
  target?: Document | Window
  byCode?: boolean
}

export const keyPress: (
  key: string,
  handler?: (event: KeyboardEvent) => void,
  options?: KeyPressOptions,
) => {
  pressed: () => boolean
  $pressed: Signal<boolean>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | `string` | — | Key to match (`event.key` or `space`) |
| `handler` | `(event) => void` | optional | Called on matching keydown |
| `options.byCode` | `boolean` | `false` | Match `event.code` instead |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `pressed()` | `boolean` | Key is currently held |
| `dispose()` | `void` | Remove key listeners |
