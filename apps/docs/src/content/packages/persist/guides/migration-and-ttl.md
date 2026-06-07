---
title: Migration & TTL
description: Schema versioning, migrate callbacks, and time-to-live expiry.
package: '@echojs-ecosystem/persist'
---

# Migration & TTL

Handle schema changes and automatic expiry of stale records.

## Version and migration

Bump `version` when the stored shape changes. Provide a `migrate` callback to
transform old data:

```ts
withLocalStorage({
  key: 'settings',
  version: 2,
  migrate: ({ data, version }) => {
    if (version === 1) return migrateV1ToV2(data)
    return data as Settings
  },
})
```

The `version` field is stored in the `PersistRecord` envelope alongside `data`.

## TTL

Expire records after a duration — removed on hydrate:

```ts
withLocalStorage({
  key: 'draft',
  ttl: 60 * 60 * 1000, // 1 hour
})
```

Use `isRecordExpired(record)` when building custom serializers or adapters.

## Validation

Optional `validate` type guard rejects corrupted hydrated data before merging
into the store.

## See also

- [Serializers](/docs/packages/persist/api/serializers)
- [Important Defaults](/docs/packages/persist/guides/important-defaults)
