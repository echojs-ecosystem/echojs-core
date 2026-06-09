---
title: documentVisibility
description: Track tab visibility (`visible` / `hidden`).
package: '@echojs-ecosystem/utils'
keywords: [documentVisibility, utils]
---

@echojs-ecosystem/utils/document-visibility

## Usage

```ts
import { documentVisibility } from '@echojs-ecosystem/utils/document-visibility'

const vis = documentVisibility()
vis.visible()
vis.hidden()
vis.dispose()
```

## Type Declarations

```ts
export type DocumentVisibilityState = Document['visibilityState']

export const documentVisibility: () => {
  value: () => DocumentVisibilityState
  hidden: () => boolean
  visible: () => boolean
  $value: Signal<DocumentVisibilityState>
  dispose: () => void
}
```

## API

### Returns

`documentVisibility()` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `DocumentVisibilityState` | Raw visibility state |
| `visible()` / `hidden()` | `boolean` | Convenience helpers |
| `dispose()` | `void` | Remove `visibilitychange` listener |
