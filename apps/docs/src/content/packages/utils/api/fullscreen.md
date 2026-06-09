---
title: fullscreen
description: Enter, exit, and track fullscreen state.
package: '@echojs-ecosystem/utils'
keywords: [fullscreen, utils]
---

@echojs-ecosystem/utils/fullscreen

## Usage

```ts
import { fullscreen } from '@echojs-ecosystem/utils/fullscreen'

const fs = fullscreen(document.documentElement)
await fs.enter()
await fs.toggle()
fs.isFullscreen()
fs.dispose()
```

## Type Declarations

```ts
export type FullscreenTarget = Element | null | undefined

export const fullscreen: (target?: MaybeSignalOrGetter<FullscreenTarget>) => {
  isFullscreen: () => boolean
  $isFullscreen: Signal<boolean>
  enter: () => Promise<void>
  exit: () => Promise<void>
  toggle: () => Promise<void>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | `MaybeSignalOrGetter<Element>` | `<html>` | Fullscreen element |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `enter()` / `exit()` / `toggle()` | `Promise<void>` | Fullscreen API |
| `isFullscreen()` | `boolean` | Whether an element is fullscreen |
| `dispose()` | `void` | Remove `fullscreenchange` listener |
