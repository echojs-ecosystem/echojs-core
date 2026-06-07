---
title: Types
description: Signal, ReadonlySignal, ReadValue, and DeepReadonly type reference.
package: '@echojs-ecosystem/reactivity'
---

# Types

## Signal&lt;T&gt;

Writable signal interface extending read methods with `set`, `update`,
`readonly`.

```ts
import type { Signal } from '@echojs-ecosystem/reactivity'
```

## ReadonlySignal&lt;T&gt;

Read + `subscribe` only — returned by `computed()` and `readonly()`.

```ts
import type { ReadonlySignal } from '@echojs-ecosystem/reactivity'
```

## ReadValue&lt;T&gt;

Result of `.value()` / `.peek()`:

| Stored `T`       | Read result       |
| ---------------- | ----------------- |
| Primitives       | `T`               |
| Objects / arrays | `DeepReadonly<T>` |

```ts
import type { ReadValue } from '@echojs-ecosystem/reactivity'
```

## DeepReadonly&lt;T&gt;

Utility type for immutable reads — prevents `user.tags.push(...)` on values from
`.value()`.

Recursive readonly mapping for objects and arrays; primitives unchanged.

```ts
import type { DeepReadonly } from '@echojs-ecosystem/reactivity'

type User = { name: string; tags: string[] }
type Frozen = DeepReadonly<User>
// { readonly name: string; readonly tags: readonly string[] }
```

## See also

- [Guides: Immutable Updates](/docs/packages/reactivity/guides/immutable-updates)
- [signal](/docs/packages/reactivity/api/signal)
