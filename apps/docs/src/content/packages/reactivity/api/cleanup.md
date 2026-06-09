---
title: cleanup
description: Register teardown to run when the current `scope()` disposes.
package: '@echojs-ecosystem/reactivity'
keywords: [cleanup, scope, reactivity]
---

@echojs-ecosystem/reactivity

## Usage

```ts
import { scope, cleanup } from '@echojs-ecosystem/reactivity'

scope(() => {
  const id = setInterval(tick, 1000)
  cleanup(() => clearInterval(id))
})
```

## Type Declarations

```ts
export const cleanup: (fn: () => void) => void
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `fn` | `() => void` | — | Must be called inside `scope()` or throws |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| — | `void` | Registers fn on the active scope bucket |

### Related

- [scope](/docs/packages/reactivity/api/scope)
