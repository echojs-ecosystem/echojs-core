---
title: hash
description: Sync with `location.hash` (without leading `#`).
package: '@echojs-ecosystem/utils'
keywords: [hash, utils]
---

@echojs-ecosystem/utils/hash

## Usage

```ts
import { hash } from '@echojs-ecosystem/utils/hash'

const route = hash()
route.set('section-2')
route.value()
route.dispose()
```

## Type Declarations

```ts
export const hash: (initial?: string) => {
  value: () => string
  set: (next: string) => void
  $value: Signal<string>
  dispose: () => void
}
```

## API

### Returns

`hash()` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `string` | Hash without `#` |
| `set(next)` | `void` | Update signal and `location.hash` |
| `dispose()` | `void` | Remove `hashchange` listener |
