---
title: Actions with withActions
description: Named mutations via withActions — the preferred pattern for store updates.
package: "@echojs-ecosystem/store"
---

# Actions with withActions

`withActions` is the preferred pattern for named store mutations. Action factories are typed, discoverable, and keep views from calling raw `set` / `update`.

## Basic pattern

```ts
import { createStore, withActions } from "@echojs-ecosystem/store";

export const themeStore = createStore("dark" as "dark" | "light", { name: "theme" }).extend(
  withActions({
    toggle: (store) => () =>
      store.update((t) => (t === "dark" ? "light" : "dark")),
    setDark: (store) => () => store.set("dark"),
    setLight: (store) => () => store.set("light"),
  }),
);

themeStore.toggle();
themeStore.setDark();
```

## Factory shape

Action factories follow `(store) => (...args) => void`:

- The **outer function** runs once at extend time — use it to close over the store
- The **inner function** is what you call from views and models

```ts
withActions({
  increment: (store) => () => store.update((v) => v + 1),
  add: (store) => (n: number) => store.update((v) => v + n),
});
```

Each key becomes a method on the extended store with inferred parameter types from the inner function.

## Counter example

```ts
export const counterStore = createStore(0, { name: "counter" }).extend(
  withActions({
    increment: (store) => () => store.update((v) => v + 1),
    decrement: (store) => () => store.update((v) => v - 1),
    add: (store) => (amount: number) => store.update((v) => v + amount),
  }),
);
```

## Custom extensions alongside actions

Combine `withActions` with other extensions:

```ts
createStore(0, { name: "counter" })
  .extend(withActions({ increment: (s) => () => s.update((v) => v + 1) }))
  .extend(withDebug());
```

## Guidelines

| Do | Avoid |
| --- | --- |
| Expose actions on the store VM | Calling `store.set()` from views |
| Keep actions synchronous | Async side effects inside actions (use effects or query) |
| Name actions after intent (`toggle`, `logout`) | Generic `updateState` wrappers |

## Related

- [Creating Stores](/docs/packages/store/guides/creating-stores)
- [API: Extensions](/docs/packages/store/api/extensions)
- [Examples: Theme & Counter](/docs/packages/store/examples/theme-and-counter)
