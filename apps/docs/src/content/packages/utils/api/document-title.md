---
title: documentTitle
description: Read and set `document.title`; restores on dispose.
package: '@echojs-ecosystem/utils'
keywords: [documentTitle, utils]
---

@echojs-ecosystem/utils/document-title

## Usage

```ts
import { documentTitle } from '@echojs-ecosystem/utils/document-title'

const title = documentTitle('EchoJS Docs')
title.set('New title')
title.dispose() // restores previous title
```

## Type Declarations

```ts
export const documentTitle: (initialTitle?: string) => {
  value: () => string
  set: (title: string) => void
  $value: Signal<string>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `initialTitle` | `string` | current title | Starting title |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `string` | Current title |
| `set(title)` | `void` | Update `document.title` |
| `dispose()` | `void` | Restore title from before create |
