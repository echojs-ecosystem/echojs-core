<div align="center">

# @echojs-ecosystem/store

**Structured client state on signals — actions, selectors, and extensions.**

[![npm](https://img.shields.io/npm/v/@echojs-ecosystem/store)](https://www.npmjs.com/package/@echojs-ecosystem/store)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/store)

</div>

---

Minimal store layer on [`@echojs-ecosystem/reactivity`](https://www.npmjs.com/package/@echojs-ecosystem/reactivity). Framework-agnostic, SSR-friendly — no `localStorage`, no UI bindings. Persistence lives in [`@echojs-ecosystem/persist`](https://www.npmjs.com/package/@echojs-ecosystem/persist).

## Features

- **`createStore`** — `value`, `set`, `update`, `reset`, `subscribe`
- **Events** — `changed`, `reseted` watchers
- **`.extend()`** — compose actions, debug, readonly, persist adapters
- **`select` / `combine`** — derived readonly stores
- **`withActions`** — typed action factories

## Install

```bash
npm install @echojs-ecosystem/store @echojs-ecosystem/reactivity
```

## Quick start

```ts
import { createStore, withActions, select } from "@echojs-ecosystem/store";

const counter = createStore(0, { name: "counter" }).extend(
  withActions({
    increment: (store) => () => store.update((v) => v + 1),
    add: (store) => (n: number) => store.update((v) => v + n),
  }),
);

counter.increment();
counter.subscribe((value, prev) => console.log({ value, prev }));

const $isPositive = select(counter, (v) => v > 0);
```

## API

| Export | Description |
|--------|-------------|
| `createStore` | Mutable store |
| `select` | Derived readonly store |
| `combine` | Merge multiple stores |
| `withActions` | Action extension |
| `withDebug` / `withReadonly` / `readonly` | Debug & immutability |
| `batch` | Re-export from `@echojs-ecosystem/reactivity` |

## Persistence

```ts
import { withLocalStorage } from "@echojs-ecosystem/persist";

const theme = createStore("dark").extend(withLocalStorage({ key: "theme", version: 1 }));
```

## Documentation

[echojs.dev/docs/packages/store](https://echojs.dev/docs/packages/store)
