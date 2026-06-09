---
title: batch
description: Defer reactive notifications until a synchronous block completes.
package: '@echojs-ecosystem/reactivity'
keywords: [batch, reactivity]
---

@echojs-ecosystem/reactivity

## Usage

```ts
import { batch, signal } from '@echojs-ecosystem/reactivity'

const $a = signal(0)
const $b = signal(0)

batch(() => {
  $a.set(1)
  $b.set(2)
})
```

## Type Declarations

```ts
export const batch: <T>(fn: () => T) => T
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `fn` | `() => T` | — | Synchronous block; returns `fn()` result |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| result | `T` | Return value of `fn` |

### Related

- [signal](/docs/packages/reactivity/api/signal)
- [effect](/docs/packages/reactivity/api/effect)
