---
title: API Reference
description: Complete @echojs-ecosystem/reactivity public API index.
package: '@echojs-ecosystem/reactivity'
---

# API Reference

Public exports from `@echojs-ecosystem/reactivity`:

```ts
import {
  signal,
  computed,
  effect,
  batch,
  scope,
  cleanup,
  readonly,
  isSignal,
  isReadonlySignal,
} from '@echojs-ecosystem/reactivity'

import type {
  Signal,
  ReadonlySignal,
  ReadValue,
  DeepReadonly,
} from '@echojs-ecosystem/reactivity'
```

## Functions

| Export                                             | Description                    |
| -------------------------------------------------- | ------------------------------ |
| [signal](/docs/packages/reactivity/api/signal)     | Writable reactive cell         |
| [computed](/docs/packages/reactivity/api/computed) | Readonly derived signal        |
| [effect](/docs/packages/reactivity/api/effect)     | Side effect with auto tracking |
| [batch](/docs/packages/reactivity/api/batch)       | Coalesce notifications         |
| [scope](/docs/packages/reactivity/api/scope)       | Effect scope with disposal     |
| [cleanup](/docs/packages/reactivity/api/cleanup)   | Register scope teardown        |
| [readonly](/docs/packages/reactivity/api/readonly) | Readonly facade                |

## Type guards

| Export                                                        | Description                 |
| ------------------------------------------------------------- | --------------------------- |
| [isSignal](/docs/packages/reactivity/api/type-guards)         | Writable or readonly signal |
| [isReadonlySignal](/docs/packages/reactivity/api/type-guards) | Readonly / computed signal  |

## Types

| Export                                       | Description                                             |
| -------------------------------------------- | ------------------------------------------------------- |
| [Types](/docs/packages/reactivity/api/types) | `Signal`, `ReadonlySignal`, `ReadValue`, `DeepReadonly` |

## Not exported (by design)

- `trigger()` — manual invalidation without `.set()`
- Engine internals (`alien-signals` direct access)

## Guides

Conceptual docs live under
[Guides & Concepts](/docs/packages/reactivity/guides/important-defaults):

- [Important Defaults](/docs/packages/reactivity/guides/important-defaults)
- [Signals](/docs/packages/reactivity/guides/signals)
- [Effects](/docs/packages/reactivity/guides/effects)
