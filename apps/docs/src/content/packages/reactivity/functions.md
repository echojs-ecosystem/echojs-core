---
title: Functions
description: Index of all @echojs-ecosystem/reactivity exports by category.
package: '@echojs-ecosystem/reactivity'
---

# Functions

Core reactive primitives — signals, derived values, effects, and scopes.

:::install @echojs-ecosystem/reactivity

## Signals

| Export | Description |
| ------ | ----------- |
| [signal](/docs/packages/reactivity/api/signal) | Writable reactive cell |
| [computed](/docs/packages/reactivity/api/computed) | Readonly derived signal |
| [readonly](/docs/packages/reactivity/api/readonly) | Readonly view of a signal |

## Effects & scopes

| Export | Description |
| ------ | ----------- |
| [effect](/docs/packages/reactivity/api/effect) | Side effect with auto tracking |
| [batch](/docs/packages/reactivity/api/batch) | Coalesce notifications |
| [scope](/docs/packages/reactivity/api/scope) | Disposable effect scope |
| [cleanup](/docs/packages/reactivity/api/cleanup) | Register scope teardown |

## Types & guards

| Export | Description |
| ------ | ----------- |
| [Type guards](/docs/packages/reactivity/api/type-guards) | `isSignal`, `isReadonlySignal` |
| [Types](/docs/packages/reactivity/api/types) | `Signal`, `ReadonlySignal`, `ReadValue`, `DeepReadonly` |
