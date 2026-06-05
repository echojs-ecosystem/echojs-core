---
title: Usage
description: createStore, subscriptions, extensions, actions, derived stores, and HyperDOM integration.
package: "@echojs/store"
---

# Usage

## `createStore`

```ts
import { createStore } from "@echojs/store";

const counter = createStore(0, { name: "counter" });

counter.set(10);
counter.update((v) => v + 1);
counter.reset(); // back to initial 0
counter.value(); // read current state
```

Each store exposes:

- **`$value`** — underlying `Signal<State>` from reactivity (use in `effect`, `computed`)
- **`name`** — optional debug label
- **`kind`** — `"store"` (or `"readonly-store"` after readonly extension)

### Custom equality

By default updates use **`Object.is`**. Skip notification when values are “equal” under your rule:

```ts
const list = createStore<string[]>([], {
  name: "tags",
  equals: (a, b) => a.length === b.length && a.every((x, i) => x === b[i]),
});

// or always emit (treat every set as a change):
const noisy = createStore(0, { equals: false });
```

## Subscriptions

### `subscribe`

```ts
const off = counter.subscribe((value, prevValue) => {
  console.log({ value, prevValue });
});
off();
```

### Events

```ts
counter.changed.watch(({ value, prevValue }) => {});
counter.reseted.watch(({ value, prevValue }) => {});
```

`reset()` emits **`reseted`** then applies the initial value (and **`changed`** if the value actually changed per `equals`).

## `.extend()` chaining

Add methods or cross-cutting behavior without subclassing:

```ts
const counter = createStore(0)
  .extend((store) => ({
    increment() {
      store.update((v) => v + 1);
    },
  }))
  .extend(withDebug())
  .extend(withReadonly()); // blocks set/update/reset on same object
```

Extensions receive the store instance and return an object merged onto it (typed per extension).

## `withActions`

Preferred pattern for named mutations:

```ts
import { createStore, withActions } from "@echojs/store";

export const themeStore = createStore("dark" as "dark" | "light", { name: "theme" }).extend(
  withActions({
    toggle: (store) => () =>
      store.update((t) => (t === "dark" ? "light" : "dark")),
    setDark: (store) => () => store.set("dark"),
  }),
);

themeStore.toggle();
```

Action factories are `(store) => (...args) => void` — the outer function runs once at extend time; the inner function is what you call.

## `select` (derived readonly)

```ts
import { createStore, select } from "@echojs/store";

const userStore = createStore({ id: "1", name: "Vova" });
const userName = select(userStore, (user) => user.name, { name: "user-name" });

userName.value();
userName.subscribe((name, prev) => {});
userName.$value; // ReadonlySignal
```

Recomputes when the source store changes. Supports `equals` in options like `createStore`.

## `combine`

```ts
import { combine, createStore } from "@echojs/store";

const firstName = createStore("Vova");
const lastName = createStore("Ivanov");

const fullName = combine(
  { firstName, lastName },
  ({ firstName, lastName }) => `${firstName} ${lastName}`,
  { name: "full-name" },
);

fullName.value(); // "Vova Ivanov"
```

Sources can be `Store` or `ReadonlyStore`. Result is **readonly** — mutate sources, not `fullName`.

## Readonly views

### `readonly(store)`

Returns a separate **ReadonlyStore** that mirrors changes but has no `set` / `update` / `reset`.

```ts
import { createStore, readonly } from "@echojs/store";

const counter = createStore(0);
const view = readonly(counter);
```

### `withReadonly()`

Locks mutation on the **same** store instance (throws on `set` / `update` / `reset`).

## `withDebug`

Logs `{ prevValue, value }` on each change to `console` (no-op if `console` missing):

```ts
createStore(0, { name: "counter" }).extend(withDebug());
```

Use `name` in `createStore` options for readable logs.

## `batch`

Re-export from `@echojs/reactivity` — group multiple store updates into one notification wave:

```ts
import { batch } from "@echojs/store";

batch(() => {
  counter.set(1);
  other.set(true);
});
```

## HyperDOM / models

**Module-level store** (shared):

```ts
// entities/session/auth-store.ts
export const authTokenStore = createStore<string | null>(null, { name: "auth-token" });
```

**View** reads via accessor or signal:

```ts
import { effect } from "@echojs/reactivity";

effect(() => {
  document.title = `Count: ${counterStore.value()}`;
});

// or inside createModel:
const count = () => counterStore.value();
```

Example docs state page: `apps/example/src/pages/docs/state/state.model.ts` — `themeStore`, `counterStore`, `counterLabel = select(...)`.

## Persistence (`@echojs/persist`)

Store does not include storage. Extend with persist adapters:

```ts
import { withLocalStorage, withCookie } from "@echojs/persist";

const token = createStore<string | null>(null).extend(
  withCookie({ key: "echojs-access-token", path: "/", sameSite: "lax" }),
);
```

Persist API exposes `store.persist.pause()`, `resume()`, `clear()` — see auth logout in `auth-store.ts`.

## Guidelines

| Do | Avoid |
| --- | --- |
| One store per domain concern (`auth-user`, `theme`) | Giant global app object |
| `withActions` for public mutations | Random `set` from views |
| `select` / `combine` for derived data | Duplicating source fields manually |
| `name` + `withDebug` in development | Anonymous stores in large apps |

## Related

- API — `/docs/packages/store/api`
- Models architecture — `/docs/architecture/models`
- Persist package (docs TBD) — `packages/persist/README.md`
