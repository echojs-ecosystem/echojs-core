---
title: effect
description: Run a side effect when tracked dependencies change.
package: '@echojs-ecosystem/reactivity'
keywords: [effect, reactivity]
---

@echojs-ecosystem/reactivity

## Usage

```ts
import { effect, signal } from '@echojs-ecosystem/reactivity'

const $n = signal(0)
const stop = effect(() => console.log($n.value()))
stop()
```

## Type Declarations

```ts
export const effect: (fn: () => void) => () => void
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `fn` | `() => void` | — | Runs synchronously, then on dep changes |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| disposer | `() => void` | Stops the effect |

### Related

- [scope](/docs/packages/reactivity/api/scope)
- [cleanup](/docs/packages/reactivity/api/cleanup)
