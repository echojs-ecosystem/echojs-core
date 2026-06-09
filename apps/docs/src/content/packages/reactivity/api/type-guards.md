---
title: Type guards
description: Runtime type guards for branded signal instances.
package: '@echojs-ecosystem/reactivity'
keywords: [isSignal, isReadonlySignal, reactivity]
---

@echojs-ecosystem/reactivity

## Usage

```ts
import { isSignal, isReadonlySignal, signal, computed } from '@echojs-ecosystem/reactivity'

if (isSignal(maybe)) maybe.value()
if (isReadonlySignal(maybe)) maybe.value()
```

## Type Declarations

```ts
export const isSignal: (
  value: unknown,
) => value is Signal<unknown> | ReadonlySignal<unknown>

export const isReadonlySignal: (
  value: unknown,
) => value is ReadonlySignal<unknown>
```

## API

### Exports

| Member | Type | Description |
| --- | --- | --- |
| `isSignal` | `boolean` | Writable or readonly branded signal |
| `isReadonlySignal` | `boolean` | Readonly / computed-style signal |

### Related

- [Types](/docs/packages/reactivity/api/types)
