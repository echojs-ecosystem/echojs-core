---
title: withStorage
description: Store extension helpers — withLocalStorage, withCookie, withStorage, persist().
package: "@echojs-ecosystem/persist"
---

# withStorage

High-level extensions attach to stores via `.extend()`.

## Built-in extensions

| Export | Storage |
| --- | --- |
| `withLocalStorage(options)` | `localStorage` |
| `withSessionStorage(options)` | `sessionStorage` |
| `withCookie(options)` | Cookies + cookie field options |
| `withIndexedDB(options)` | IndexedDB KV |
| `withMemoryStorage(options)` | In-memory |
| `withStorage(adapter, options)` | Generic `StorageAdapter` |

## `PersistOptions` (common)

| Field | Description |
| --- | --- |
| `key` | Storage key (required) |
| `version` | Schema version for migration |
| `ttl` | Ms until expiry |
| `hydrate` | Auto-hydrate on attach (default `true`) |
| `saveInitial` | Persist initial value immediately |
| `debounce` | Debounce ms for auto-save |
| `syncTabs` | localStorage cross-tab sync |
| `serializer` | Custom `PersistRecord` serializer |
| `select` / `merge` | Partial snapshot read/write |
| `migrate` | `(ctx) => Snapshot` |
| `validate` | Type guard for hydrated data |
| `onHydrate` / `onSave` / `onError` | Lifecycle hooks |

## Cookie extras

`path`, `domain`, `sameSite`, `secure`, `maxAge`

## IndexedDB extras

`dbName`, `storeName`, …

## Standalone `persist()`

```ts
import { persist, withLocalStorage } from "@echojs-ecosystem/persist";

persist(fieldLike, withLocalStorage({ key: "profile:name" }));
```

`persistField` / `persistFieldArray` — aliases for form-like targets.

## See also

- [Storage Adapters guide](/docs/packages/persist/guides/storage-adapters)
- [Persist Controller](/docs/packages/persist/api/persist-controller)
