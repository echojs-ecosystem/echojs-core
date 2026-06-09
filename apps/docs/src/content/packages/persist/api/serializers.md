---
title: Serializers
description: JSON serializer, persist record envelope, and TTL helpers.
package: '@echojs-ecosystem/persist'
keywords: [Serializers, persist]
---

@echojs-ecosystem/persist

## Usage

```ts
type PersistRecord<Snapshot> = {
  version: number
  createdAt: number
  updatedAt: number
  expiresAt?: number
  data: Snapshot
}
```

## Type Declarations

```ts
type PersistRecord<Snapshot> = {
  version: number
  createdAt: number
  updatedAt: number
  expiresAt?: number
  data: Snapshot
}
```

## API
