---
title: clipboard
description: Copy text via the Clipboard API.
package: '@echojs-ecosystem/utils'
keywords: [clipboard, utils]
---

@echojs-ecosystem/utils/clipboard

## Usage

```ts
import { clipboard } from '@echojs-ecosystem/utils/clipboard'

const clip = clipboard()
await clip.copy('Hello EchoJS')
clip.copied()
clip.dispose()
```

## Type Declarations

```ts
export const clipboard: () => {
  copy: (text: string) => Promise<void>
  text: () => string
  copied: () => boolean
  error: () => unknown
  $text: Signal<string>
  $copied: Signal<boolean>
  $error: Signal<unknown>
  dispose: () => void
}
```

## API

### Returns

`clipboard()` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| `copy(text)` | `Promise<void>` | Write to clipboard; throws if unavailable |
| `copied()` | `boolean` | `true` ~2s after success |
| `text()` | `string` | Last copied text |
| `error()` | `unknown` | Last error or `null` |
| `dispose()` | `void` | Clear copied reset timer |

### SSR

`copy()` throws when `navigator.clipboard` is missing.
