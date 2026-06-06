---
title: API Reference
description: Complete @echojs-ecosystem/persist public API index.
package: "@echojs-ecosystem/persist"
---

# API Reference

Public exports from `@echojs-ecosystem/persist`:

```ts
import {
  withLocalStorage,
  withSessionStorage,
  withCookie,
  withIndexedDB,
  withMemoryStorage,
  withStorage,
  persist,
  persistField,
  persistFieldArray,
} from "@echojs-ecosystem/persist";
```

## Extensions

| Export | Description |
| --- | --- |
| [withStorage](/docs/packages/persist/api/with-storage) | Store extensions and `persist()` helper |
| [Adapters](/docs/packages/persist/api/adapters) | Low-level `create*Adapter` factories |
| [Serializers](/docs/packages/persist/api/serializers) | JSON serializer and persist record envelope |
| [Persist Controller](/docs/packages/persist/api/persist-controller) | `hydrate`, `save`, `clear`, status signals |

## Types

`Persistable`, `PersistOptions`, `PersistRecord`, `PersistExtension`, `PersistExtensionResult`, `PersistController`, `StorageAdapter`, `Serializer`, `MigrateContext`, `CookiePersistOptions`, `IndexedDBPersistOptions`, `FieldLike`, `FieldArrayLike`, `PersistableForm`

## Guides

- [Important Defaults](/docs/packages/persist/guides/important-defaults)
- [Hydrate & Save](/docs/packages/persist/guides/hydrate-and-save)
- [Migration & TTL](/docs/packages/persist/guides/migration-and-ttl)
