---
title: API Reference
description: Public exports from @echojs/persist.
package: "@echojs/persist"
---

# API Reference

## Extensions

| Export | Description |
| --- | --- |
| `withLocalStorage(options)` | `localStorage` adapter |
| `withSessionStorage(options)` | `sessionStorage` |
| `withCookie(options)` | Cookie adapter + cookie fields |
| `withIndexedDB(options)` | IndexedDB KV |
| `withMemoryStorage(options)` | In-memory |
| `withStorage(adapter, options)` | Generic `StorageAdapter` |

## Helpers

| Export | Description |
| --- | --- |
| `persist(target, extension)` | Attach without store `.extend()` |
| `persistField` / `persistFieldArray` | Form-field aliases |

## Adapters (low-level)

| Export | Description |
| --- | --- |
| `createLocalStorageAdapter()` | Browser localStorage |
| `createSessionStorageAdapter()` | sessionStorage |
| `createCookieStorageAdapter()` | Cookies |
| `createIndexedDBStorageAdapter()` | IndexedDB |
| `createMemoryStorageAdapter()` | Memory |

## Serialization

| Export | Description |
| --- | --- |
| `jsonSerializer` | Default JSON serializer |
| `createJsonSerializer()` | Factory |
| `createPersistRecord(snapshot, options)` | Build record envelope |
| `isRecordExpired(record)` | TTL check |

## `PersistOptions` (common)

| Field | Description |
| --- | --- |
| `key` | Storage key (required) |
| `version` | Schema version for migration |
| `ttl` | Ms until expiry |
| `hydrate` | Auto-hydrate on attach (default true) |
| `saveInitial` | Persist initial value immediately |
| `debounce` | Debounce ms for auto-save |
| `syncTabs` | localStorage cross-tab sync |
| `serializer` | Custom `PersistRecord` serializer |
| `select` / `merge` | Partial snapshot read/write |
| `migrate` | `(ctx) => Snapshot` |
| `validate` | Type guard for hydrated data |
| `onHydrate` / `onSave` / `onError` | Hooks |

## `CookiePersistOptions` extras

`path`, `domain`, `sameSite`, `secure`, `maxAge`

## `IndexedDBPersistOptions` extras

`dbName`, `storeName`, …

## `PersistController`

| Member | Description |
| --- | --- |
| `key` | Storage key |
| `hydrate()` | Load into target |
| `save()` | Write current value |
| `clear()` | Remove storage entry |
| `pause()` / `resume()` | Toggle auto persistence |
| `$hydrated` | Hydration completed |
| `$pending` | Async op in flight |
| `$error` | Last error |

## Types

`Persistable`, `PersistOptions`, `PersistRecord`, `PersistExtension`, `PersistExtensionResult`, `PersistController`, `StorageAdapter`, `Serializer`, `MigrateContext`, `CookiePersistOptions`, `IndexedDBPersistOptions`, …

## Related

- Usage — `/docs/packages/persist/usage`
- Overview — `/docs/packages/persist`
