---
title: Readonly Signals
description: Expose read-only facades for signals and computed values.
package: "@echojs-ecosystem/reactivity"
---

# Readonly Signals

Readonly signals expose `.value()`, `.peek()`, and `.subscribe()` — but not `.set()` / `.update()`. Use them at module boundaries so callers cannot mutate internal state.

## signal.readonly()

Every writable signal has a `.readonly()` method:

```ts
const $user = signal({ name: "Ada" });
export const user = $user.readonly();

// user.set(...) — not on type / not on readonly facade
```

## readonly(sig)

Wrap any writable or readonly signal:

```ts
import { readonly, signal } from "@echojs-ecosystem/reactivity";

const $internal = signal(0);
const $public = readonly($internal);
```

## computed is always readonly

`computed()` returns a `ReadonlySignal` — no write methods by design.

## Models pattern

Keep writable signals private inside `createModel` and expose accessors:

```ts
export const createHomeModel = createModel((): HomeVM => {
  const $tab = signal(0);
  return {
    activeTab: $tab.readonly(),
    isTabActive: (i: number) => $tab.value() === i,
    setTab: (i: number) => $tab.set(i),
  };
}, "HomeModel");
```

## Related

- [Signals](/docs/packages/reactivity/guides/signals)
- [API: readonly](/docs/packages/reactivity/api/readonly)
