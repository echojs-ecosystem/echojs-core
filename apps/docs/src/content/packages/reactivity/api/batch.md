---
title: batch
description: batch(fn) — defer reactive notifications until fn completes.
package: '@echojs-ecosystem/reactivity'
---

# batch

```ts
function batch<T>(fn: () => T): T
```

Runs `fn`, batches reactive notifications until `fn` completes, returns `fn()`'s
return value. `fn` must be a function.

## Example

```ts
import { batch, signal } from '@echojs-ecosystem/reactivity'

const $a = signal(0)
const $b = signal(0)

batch(() => {
  $a.set(1)
  $b.set(2)
})
```

## See also

- [Guides: Batching](/docs/packages/reactivity/guides/batching)
