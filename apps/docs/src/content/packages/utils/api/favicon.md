---
title: favicon
description: Read and update `<link rel="icon">` href.
package: '@echojs-ecosystem/utils'
keywords: [favicon, utils]
---

@echojs-ecosystem/utils/favicon

## Usage

```ts
import { favicon } from '@echojs-ecosystem/utils/favicon'

const icon = favicon('/favicon.svg')
icon.set('/favicon-dark.svg')
icon.dispose()
```

## Type Declarations

```ts
export const favicon: (initialHref?: string) => {
  value: () => string
  set: (href: string) => void
  $href: Signal<string>
  dispose: () => void
}
```

## API

### Returns

`favicon()` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `string` | Current favicon href |
| `set(href)` | `void` | Update link href |
| `dispose()` | `void` | Restore previous href |
