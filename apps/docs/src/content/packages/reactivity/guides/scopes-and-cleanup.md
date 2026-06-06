---
title: Scopes & Cleanup
description: Group effects and register teardown callbacks with scope() and cleanup().
package: "@echojs-ecosystem/reactivity"
---

# Scopes & Cleanup

Use **`scope()`** to group reactive work and **`cleanup()`** to register teardown when the scope disposes — timers, subscriptions, DOM listeners, etc.

## scope()

```ts
import { scope, effect, signal, cleanup } from "@echojs-ecosystem/reactivity";

const $id = signal("a");

const stopScope = scope(() => {
  effect(() => {
    console.log("active id:", $id.value());
  });

  cleanup(() => {
    console.log("scope disposed");
  });
});

stopScope(); // tears down effects + runs cleanup callbacks
```

## cleanup()

`cleanup(fn)` **must** be called **synchronously** inside an active `scope()`. Otherwise it throws:

```
cleanup(fn) must be called inside scope()
```

```ts
scope(() => {
  const timer = setInterval(tick, 1000);

  cleanup(() => clearInterval(timer));
});
```

## Nested scopes

Each `scope()` returns its own disposer. Disposing a parent scope runs all registered cleanups and tears down effects created inside it.

## When to use

| Pattern | Tool |
| --- | --- |
| Single side effect | `effect()` + its disposer |
| Feature module with multiple effects | `scope()` |
| Non-reactive teardown (timers, abort controllers) | `cleanup()` inside `scope()` |

## Related

- [Effects](/docs/packages/reactivity/guides/effects)
- [API: scope](/docs/packages/reactivity/api/scope)
- [API: cleanup](/docs/packages/reactivity/api/cleanup)
