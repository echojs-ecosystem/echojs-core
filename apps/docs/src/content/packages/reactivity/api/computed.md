---
title: computed
description: Create a readonly derived signal from a getter function.
package: '@echojs-ecosystem/reactivity'
keywords: [computed, derived, reactivity]
---

@echojs-ecosystem/reactivity

## Usage

```ts
import { computed, signal } from '@echojs-ecosystem/reactivity'

const $a = signal(1)
const $double = computed(() => $a.value() * 2)
$double.value()
```

## Type Declarations

```ts
export const computed: <T>(getter: () => T) => ReadonlySignal<T>
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `getter` | `() => T` | — | Re-runs when tracked deps inside change |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `.value()` | `ReadValue<T>` | Read (tracks deps, may recompute) |
| `.peek()` | `ReadValue<T>` | Read without tracking |
| `.subscribe(fn)` | `() => void` | Same change-only contract as `signal` |

### Related

- [signal](/docs/packages/reactivity/api/signal)
- [effect](/docs/packages/reactivity/api/effect)
