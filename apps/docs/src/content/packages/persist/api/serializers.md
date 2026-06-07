---
title: Serializers
description: JSON serializer, persist record envelope, and TTL helpers.
package: '@echojs-ecosystem/persist'
---

# Serializers

Persist wraps snapshots in a versioned record envelope before writing to
storage.

## Record shape

```ts
type PersistRecord<Snapshot> = {
  version: number
  createdAt: number
  updatedAt: number
  expiresAt?: number
  data: Snapshot
}
```

## Exports

| Export                                   | Description             |
| ---------------------------------------- | ----------------------- |
| `jsonSerializer`                         | Default JSON serializer |
| `createJsonSerializer()`                 | Serializer factory      |
| `createPersistRecord(snapshot, options)` | Build record envelope   |
| `isRecordExpired(record)`                | TTL check               |

Pass a custom `serializer` in `PersistOptions` when you need compression or
encryption.

## See also

- [Migration & TTL](/docs/packages/persist/guides/migration-and-ttl)
