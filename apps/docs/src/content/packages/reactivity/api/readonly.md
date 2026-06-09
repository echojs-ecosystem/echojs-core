---
title: readonly
description: Return a readonly view of a writable or readonly signal.
package: '@echojs-ecosystem/reactivity'
keywords: [readonly, reactivity]
---

@echojs-ecosystem/reactivity

## Usage

```ts
import { readonly, signal } from '@echojs-ecosystem/reactivity'

const $internal = signal(0)
export const count = readonly($internal)
// or: $internal.readonly()
```

## Type Declarations

```ts
export const readonly: <T>(
  sig: Signal<T> | ReadonlySignal<T>,
) => ReadonlySignal<T>
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `sig` | `Signal<T> \| ReadonlySignal<T>` | — | Source signal |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `ReadonlySignal<T>` | — | Read + subscribe only; no `.set()` / `.update()` |

### Related

- [signal](/docs/packages/reactivity/api/signal)
- [Types](/docs/packages/reactivity/api/types)
