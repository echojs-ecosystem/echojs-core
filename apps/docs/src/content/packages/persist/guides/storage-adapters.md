---
title: Storage Adapters
description: localStorage, sessionStorage, cookies, IndexedDB, memory, and custom adapters.
package: "@echojs-ecosystem/persist"
---

# Storage Adapters

Choose an adapter extension based on **size**, **lifetime**, and **transport** requirements.

## localStorage

```ts
import { withLocalStorage } from "@echojs-ecosystem/persist";

createStore({ theme: "system" }).extend(
  withLocalStorage({ key: "prefs", version: 1 }),
);
```

Best for user preferences and medium-sized JSON snapshots. Supports `syncTabs` for cross-tab updates.

## sessionStorage

```ts
import { withSessionStorage } from "@echojs-ecosystem/persist";

const filters = createStore({ search: "", category: null }).extend(
  withSessionStorage({ key: "catalog-filters", version: 1 }),
);
```

Data survives reloads within the same tab session; cleared when the tab closes.

## Cookies

```ts
import { withCookie } from "@echojs-ecosystem/persist";

const token = createStore<string | null>(null).extend(
  withCookie({
    key: "echojs-access-token",
    path: "/",
    sameSite: "lax",
    secure: true,
  }),
);
```

> Cookie limits (~4KB) and cookies are sent on every request — use for tokens and small flags only.

## IndexedDB

```ts
import { withIndexedDB } from "@echojs-ecosystem/persist";

const cache = createStore<Record<string, Product>>({}).extend(
  withIndexedDB({
    key: "products-cache",
    dbName: "echojs",
    storeName: "kv",
  }),
);
```

If IndexedDB is unavailable, dev builds may fall back to in-memory storage with a warning.

## Memory (SSR / tests)

```ts
import { withMemoryStorage } from "@echojs-ecosystem/persist";

createStore(0).extend(withMemoryStorage({ key: "counter-test" }));
```

Safe when `window` is missing — no browser APIs required.

## Custom adapter

```ts
import { withStorage } from "@echojs-ecosystem/persist";

const adapter = {
  kind: "custom",
  getItem: (key) => external.get(key),
  setItem: (key, value) => external.set(key, value),
  removeItem: (key) => external.delete(key),
};

createStore(0).extend(withStorage(adapter, { key: "counter" }));
```

## See also

- [Adapters API](/docs/packages/persist/api/adapters)
- [Slicing & Merge](/docs/packages/persist/guides/slicing-and-merge)
