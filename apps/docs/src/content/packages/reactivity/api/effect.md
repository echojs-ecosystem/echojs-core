---
title: effect
description: effect(fn) — run side effects when tracked dependencies change.
package: '@echojs-ecosystem/reactivity'
---

# effect

```ts
function effect(fn: () => void): () => void
```

Runs `fn` **synchronously**, then re-runs when dependencies read via `.value()`
inside `fn` change. Returns **disposer** `() => void`.

`fn` must be a function or `TypeError` is thrown.

## Example

```ts
import { effect, signal } from '@echojs-ecosystem/reactivity'

const $n = signal(0)
const stop = effect(() => console.log($n.value()))
stop()
```

## See also

- [Guides: Effects](/docs/packages/reactivity/guides/effects)
- [scope](/docs/packages/reactivity/api/scope)
