<div align="center">

# @echojs-ecosystem/persist

**Storage extensions for stores and form fields — localStorage, cookies, IndexedDB, and more.**

[![npm](https://img.shields.io/npm/v/@echojs-ecosystem/persist)](https://www.npmjs.com/package/@echojs-ecosystem/persist)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/persist)

</div>

---

Universal persistence via **`.extend()`**. Works with [`@echojs-ecosystem/store`](https://www.npmjs.com/package/@echojs-ecosystem/store) and any object matching the persistable contract (`value` / `set` / `subscribe`).

## Features

- **Adapters** — `localStorage`, `sessionStorage`, `cookie`, `IndexedDB`, in-memory
- **`.extend(withLocalStorage(...))`** — plug-and-play for stores & fields
- **Versioning & migration** — schema version with `migrate` callback
- **TTL** — auto-expire stale records on hydrate
- **Select / merge** — persist slices of state (e.g. token only)
- **SSR-safe** — memory fallback when `window` is unavailable

## Install

```bash
npm install @echojs-ecosystem/persist @echojs-ecosystem/store
```

## Quick start

```ts
import { createStore } from "@echojs-ecosystem/store";
import { withLocalStorage } from "@echojs-ecosystem/persist";

export const themeStore = createStore("dark", { name: "theme" }).extend(
  withLocalStorage({ key: "app-theme", version: 1 }),
);

// Imperative control
await themeStore.persist.hydrate();
await themeStore.persist.save();
themeStore.persist.$hydrated.value();
```

## Adapters

```ts
import { withSessionStorage, withCookie, withIndexedDB } from "@echojs-ecosystem/persist";

createStore(filters).extend(withSessionStorage({ key: "filters", version: 1 }));
createStore(token).extend(withCookie({ key: "token", path: "/", sameSite: "lax" }));
createStore(cache).extend(withIndexedDB({ key: "cache", dbName: "echojs", storeName: "kv" }));
```

## Persist record

```ts
type PersistRecord<T> = {
  version: number;
  createdAt: number;
  updatedAt: number;
  expiresAt?: number;
  data: T;
};
```

## API

| Export | Description |
|--------|-------------|
| `withLocalStorage` | Browser localStorage (+ optional tab sync) |
| `withSessionStorage` | sessionStorage |
| `withCookie` | document.cookie |
| `withIndexedDB` | Async IndexedDB KV |
| `withMemoryStorage` | Tests & SSR |
| `withStorage` | Custom adapter |
| `persist` | Attach without `.extend()` |

## Documentation

[echojs.dev/docs/packages/persist](https://echojs.dev/docs/packages/persist)
