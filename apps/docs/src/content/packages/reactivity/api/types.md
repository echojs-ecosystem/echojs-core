---
title: Types
description: Public TypeScript types exported from the package.
package: '@echojs-ecosystem/reactivity'
keywords: [Signal, ReadonlySignal, ReadValue, DeepReadonly]
---

@echojs-ecosystem/reactivity

## Usage

```ts
import type {
  Signal,
  ReadonlySignal,
  ReadValue,
  DeepReadonly,
} from '@echojs-ecosystem/reactivity'
```

## Type Declarations

```ts
export interface ReadonlySignal<T> {
  value(): ReadValue<T>
  peek(): ReadValue<T>
  subscribe(fn: () => void): () => void
}

export interface Signal<T> extends ReadonlySignal<T> {
  set(next: T): void
  update(fn: (prev: T) => T): void
  readonly(): ReadonlySignal<T>
}

export type ReadValue<T> = T extends object ? DeepReadonly<T> : T

export type DeepReadonly<T> = T extends (...args: any[]) => any
  ? T
  : T extends readonly (infer U)[]
    ? readonly DeepReadonly<U>[]
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T
```

## API

### Exports

| Member | Type | Description |
| --- | --- | --- |
| `Signal<T>` | interface | Writable signal |
| `ReadonlySignal<T>` | interface | Read + subscribe only |
| `ReadValue<T>` | type | Result of `.value()` / `.peek()` |
| `DeepReadonly<T>` | type | Recursive readonly for object reads |

### Related

- [signal](/docs/packages/reactivity/api/signal)
- [Type guards](/docs/packages/reactivity/api/type-guards)
