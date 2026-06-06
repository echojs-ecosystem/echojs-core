---
title: Type Guards
description: isSignal and isReadonlySignal runtime type guards.
package: "@echojs-ecosystem/reactivity"
---

# Type Guards

## isSignal

```ts
function isSignal(value: unknown): value is Signal<unknown> | ReadonlySignal<unknown>
```

Type guard for branded writable or readonly signal instances from this package.

```ts
import { isSignal, signal } from "@echojs-ecosystem/reactivity";

if (isSignal(maybe)) {
  maybe.value();
}
```

## isReadonlySignal

```ts
function isReadonlySignal(value: unknown): value is ReadonlySignal<unknown>
```

Type guard for readonly/branded computed-style signals (no `.set()` / `.update()`).

```ts
import { computed, isReadonlySignal } from "@echojs-ecosystem/reactivity";

const $x = computed(() => 1);
isReadonlySignal($x); // true
```

## See also

- [Types](/docs/packages/reactivity/api/types)
