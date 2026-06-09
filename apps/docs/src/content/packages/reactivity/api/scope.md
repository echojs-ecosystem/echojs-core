---
title: scope
description: Create a disposable effect scope with registered cleanups.
package: '@echojs-ecosystem/reactivity'
keywords: [scope, cleanup, reactivity]
---

@echojs-ecosystem/reactivity

## Usage

```ts
import { scope, effect, cleanup } from '@echojs-ecosystem/reactivity'

const stop = scope(() => {
  effect(() => { /* … */ })
  cleanup(() => { /* teardown */ })
})

stop()
```

## Type Declarations

```ts
export const scope: (fn: () => void) => () => void
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `fn` | `() => void` | — | Body runs inside a new scope |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| disposer | `() => void` | Tears down effects and `cleanup()` callbacks |

### Related

- [cleanup](/docs/packages/reactivity/api/cleanup)
- [effect](/docs/packages/reactivity/api/effect)
