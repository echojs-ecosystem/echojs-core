---
title: Adapters
description: Low-level create*StorageAdapter factories.
package: "@echojs-ecosystem/persist"
---

# Adapters

Low-level adapter factories implement the `StorageAdapter` interface. Use with `withStorage(adapter, options)` for custom backends.

## Factories

| Export | Description |
| --- | --- |
| `createLocalStorageAdapter()` | Browser `localStorage` |
| `createSessionStorageAdapter()` | `sessionStorage` |
| `createCookieStorageAdapter()` | Cookies |
| `createIndexedDBStorageAdapter()` | IndexedDB KV |
| `createMemoryStorageAdapter()` | In-memory |

## Custom adapter

```ts
const adapter = {
  kind: "custom",
  getItem: (key) => external.get(key),
  setItem: (key, value) => external.set(key, value),
  removeItem: (key) => external.delete(key),
};

createStore(0).extend(withStorage(adapter, { key: "counter" }));
```

## See also

- [withStorage](/docs/packages/persist/api/with-storage)
- [Storage Adapters guide](/docs/packages/persist/guides/storage-adapters)
