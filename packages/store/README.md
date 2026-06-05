<div align="center">

# @echojs/store

**Structured client state on signals — actions, selectors, and extensions.**

[![npm](https://img.shields.io/npm/v/@echojs/store)](https://www.npmjs.com/package/@echojs/store)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/store)

</div>

---

Minimal store layer on [`@echojs/reactivity`](https://www.npmjs.com/package/@echojs/reactivity). Framework-agnostic, SSR-friendly — no `localStorage`, no UI bindings. Persistence lives in [`@echojs/persist`](https://www.npmjs.com/package/@echojs/persist).

## Features

- **`createStore`** — `value`, `set`, `update`, `reset`, `subscribe`
- **Events** — `changed`, `reseted` watchers
- **`.extend()`** — compose actions, debug, readonly, persist adapters
- **`select` / `combine`** — derived readonly stores
- **`withActions`** — typed action factories

## Install

```bash
npm install @echojs/store @echojs/reactivity
```

## Quick start

```ts
import { createStore, withActions, select } from "@echojs/store";

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
| `batch` | Re-export from `@echojs/reactivity` |

## Persistence

```ts
import { withLocalStorage } from "@echojs/persist";

const theme = createStore("dark").extend(withLocalStorage({ key: "theme", version: 1 }));
```

## Documentation

[echojs.dev/docs/packages/store](https://echojs.dev/docs/packages/store)
