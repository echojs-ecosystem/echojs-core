---
title: Usage
description: withLocalStorage, hydrate/save, cookie/IndexedDB, TTL, migrations, and auth patterns.
package: "@echojs/persist"
---

# Usage

## Basic `.extend()`

```ts
import { createStore } from "@echojs/store";
import { withLocalStorage } from "@echojs/persist";

export const themeStore = createStore("dark", { name: "theme" }).extend(
  withLocalStorage({
    key: "app-theme",
    version: 1,
  }),
);
```

By default hydration runs when the extension attaches (unless `hydrate: false`).

## `persist` controller

```ts
await themeStore.persist.hydrate();
await themeStore.persist.save();
await themeStore.persist.clear();

themeStore.persist.pause();  // stop auto-save
themeStore.persist.resume();

themeStore.persist.$hydrated.value();
themeStore.persist.$pending.value();
themeStore.persist.$error.value();
```

IndexedDB operations are **async** — watch `$pending` during hydrate/save.

## Manual hydrate

```ts
const draft = createStore("").extend(
  withLocalStorage({ key: "draft", hydrate: false }),
);

await draft.persist.hydrate();
```

## Session & cookie

```ts
import { withSessionStorage, withCookie } from "@echojs/persist";

const filters = createStore({ search: "", category: null }).extend(
  withSessionStorage({ key: "catalog-filters", version: 1 }),
);

const token = createStore<string | null>(null).extend(
  withCookie({
    key: "echojs-access-token",
    path: "/",
    sameSite: "lax",
    secure: true,
  }),
);
```

> Cookie limits (~4KB) and cookies are sent on every request — use for tokens/small flags only.

## IndexedDB

```ts
import { withIndexedDB } from "@echojs/persist";

const cache = createStore<Record<string, Product>>({}).extend(
  withIndexedDB({
    key: "products-cache",
    dbName: "echojs",
    storeName: "kv",
  }),
);
```

If IndexedDB is unavailable, dev builds may fall back to in-memory storage with a warning.

## Select / merge (partial persistence)

Persist only part of a store (e.g. token in cookie, profile in localStorage):

```ts
const auth = createStore({ token: null as string | null, user: null }).extend(
  withCookie({
    key: "access-token",
    select: (state) => state.token,
    merge: (state, token) => ({ ...state, token }),
  }),
);
```

Example: `apps/example/src/entities/session/auth-store.ts` — separate stores for token (cookie) and user (localStorage).

## Persist record format

Stored JSON wraps your snapshot:

```ts
type PersistRecord<Snapshot> = {
  version: number;
  createdAt: number;
  updatedAt: number;
  expiresAt?: number;
  data: Snapshot;
};
```

## TTL

```ts
withLocalStorage({
  key: "draft",
  ttl: 60 * 60 * 1000, // 1 hour — expired records removed on hydrate
});
```

## Version & migration

```ts
withLocalStorage({
  key: "settings",
  version: 2,
  migrate: ({ data, version }) => {
    if (version === 1) return migrateV1ToV2(data);
    return data as Settings;
  },
});
```

## `syncTabs` (localStorage)

```ts
withLocalStorage({ key: "theme", syncTabs: true });
```

Other tabs update the store when storage changes.

## Logout pattern (pause + clear)

```ts
authTokenStore.persist.pause();
authUserStore.persist.pause();
try {
  authTokenStore.set(null);
  authUserStore.set(null);
  await Promise.all([
    authTokenStore.persist.clear(),
    authUserStore.persist.clear(),
  ]);
} finally {
  authTokenStore.persist.resume();
  authUserStore.persist.resume();
}
```

## Without `.extend()` on store

```ts
import { persist, withLocalStorage } from "@echojs/persist";

persist(fieldLike, withLocalStorage({ key: "profile:name" }));
```

`persistField` / `persistFieldArray` are aliases for form-like targets (future `@echojs/form`).

## Custom adapter

```ts
import { withStorage } from "@echojs/persist";

const adapter = {
  kind: "custom",
  getItem: (key) => external.get(key),
  setItem: (key, value) => external.set(key, value),
  removeItem: (key) => external.delete(key),
};

createStore(0).extend(withStorage(adapter, { key: "counter" }));
```

## Related

- API — `/docs/packages/persist/api`
- Store usage — `/docs/packages/store/usage`
