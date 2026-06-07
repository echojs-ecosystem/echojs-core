---
title: scope
description: scope(fn) — create a disposable effect scope.
package: '@echojs-ecosystem/reactivity'
---

# scope

```ts
function scope(fn: () => void): () => void
```

Starts an effect scope. Returns disposer that tears down effects created inside
and runs registered `cleanup()` callbacks.

`fn` must be a function or `TypeError` is thrown.

## Example

```ts
import { scope, effect, cleanup } from '@echojs-ecosystem/reactivity'

const stop = scope(() => {
  effect(() => {
    /* ... */
  })
  cleanup(() => {
    /* teardown */
  })
})

stop()
```

## See also

- [Guides: Scopes & Cleanup](/docs/packages/reactivity/guides/scopes-and-cleanup)
- [cleanup](/docs/packages/reactivity/api/cleanup)
