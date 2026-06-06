---
title: readonly
description: readonly(sig) — return a readonly view of a signal.
package: "@echojs-ecosystem/reactivity"
---

# readonly

```ts
function readonly<T>(sig: Signal<T> | ReadonlySignal<T>): ReadonlySignal<T>
```

Returns a readonly view of a writable or readonly signal. Strips `.set()` / `.update()` from the type surface.

Writable signals also expose `.readonly()` with the same result.

## Example

```ts
import { readonly, signal } from "@echojs-ecosystem/reactivity";

const $internal = signal(0);
export const count = readonly($internal);
```

## See also

- [Guides: Readonly Signals](/docs/packages/reactivity/guides/readonly-signals)
