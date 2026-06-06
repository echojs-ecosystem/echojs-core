---
title: computed
description: computed(getter) — create a readonly derived signal.
package: "@echojs-ecosystem/reactivity"
---

# computed

```ts
function computed<T>(getter: () => T): ReadonlySignal<T>
```

Creates a **readonly** derived signal. `getter` must be a function or `TypeError` is thrown.

## Methods

| Method | Description |
| --- | --- |
| `.value()` | Read (tracks deps, may recompute) |
| `.peek()` | Read without tracking |
| `.subscribe(fn)` | Same change-only contract as `signal` |

No `.set()` / `.update()`.

## Example

```ts
import { computed, signal } from "@echojs-ecosystem/reactivity";

const $a = signal(1);
const $double = computed(() => $a.value() * 2);
```

## Errors

| Call | Error |
| --- | --- |
| `computed(x)` non-function | `TypeError: computed(getter) expects a function` |

## See also

- [Guides: Computed Values](/docs/packages/reactivity/guides/computed)
