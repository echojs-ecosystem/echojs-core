---
title: Example
description: Theme and counter stores from the EchoJS example docs module.
package: "@echojs/store"
---

# Example — Store

## State demo (`apps/example`)

```ts
// pages/docs/state/state.model.ts
import { createStore, select, withActions } from "@echojs/store";

export const themeStore = createStore("dark" as "dark" | "light", { name: "theme" }).extend(
  withActions({
    toggle: (store) => () =>
      store.update((t) => (t === "dark" ? "light" : "dark")),
    setDark: (store) => () => store.set("dark"),
    setLight: (store) => () => store.set("light"),
  }),
);

export const counterStore = createStore(0, { name: "counter" }).extend(
  withActions({
    increment: (store) => () => store.update((v) => v + 1),
    decrement: (store) => () => store.update((v) => v - 1),
    add: (store) => (amount: number) => store.update((v) => v + amount),
  }),
);

export const counterLabel = select(counterStore, (n) => `×${n}`, {
  name: "counter-label",
});
```

## View reads store

```ts
import { effect } from "@echojs/reactivity";
import { themeStore } from "./state.model.js";

effect(() => {
  document.documentElement.dataset.theme = themeStore.value();
});

button({ onClick: () => themeStore.toggle() }, () => `Theme: ${themeStore.value()}`);
```

## Session stores (with persist)

См. также [Persist Example](/docs/packages/persist/example) — `authTokenStore` / `authUserStore` в `entities/session/auth-store.ts`.

## combine

```ts
import { combine, createStore } from "@echojs/store";

const first = createStore("Echo");
const last = createStore("JS");

const fullName = combine(
  { first, last },
  ({ first, last }) => `${first} ${last}`,
);
```

## Live app

| Resource | Path |
| --- | --- |
| State page model | `apps/example/src/pages/docs/state/state.model.ts` |
| Auth stores | `apps/example/src/entities/session/auth-store.ts` |

## See also

- Persist Example — `/docs/packages/persist/example`
- Usage — `/docs/packages/store/usage`
