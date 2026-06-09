---
title: boolean
description: Alias of `toggle` with boolean semantics.
package: '@echojs-ecosystem/utils'
keywords: [boolean, utils]
---

@echojs-ecosystem/utils/boolean

## Usage

```ts
import { boolean } from '@echojs-ecosystem/utils/boolean'

const flag = boolean(true)
flag.value()
```

## Type Declarations

```ts
export const boolean: (initial?: boolean) => ReturnType<typeof toggle>
```

## API

### Returns

`boolean()` — see Type Declarations for the full signature.

### Related

- [toggle](/docs/packages/utils/api/toggle)
