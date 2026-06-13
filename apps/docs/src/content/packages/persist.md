---
title: Persist
description: Persist Echo stores to localStorage, cookies, and other adapters.
package: '@echojs-ecosystem/persist'
keywords: [withLocalStorage, hydrate, migrate]
---

:::package-overview persist

:::install @echojs-ecosystem/persist

## Key APIs

| Export | Role |
| ------ | ---- |
| [`withStorage`](/docs/packages/persist/api/with-storage) | Generic adapter hook for any `createStore` |
| [`withLocalStorage`](/docs/packages/persist/guides/storage-adapters) | Browser `localStorage` with versioning |
| [`Persist controller`](/docs/packages/persist/api/persist-controller) | Manual `hydrate()`, `flush()`, and migration |
| [`Serializers`](/docs/packages/persist/api/serializers) | JSON, dates, and custom encode/decode |

## Common patterns

- **`select`** only the slice you need — avoid persisting entire app state.
- Bump **`version`** and provide `migrate` when renaming keys or reshaping state.
- Call **`.persist.hydrate()`** after bootstrap when guards read persisted session.

> [!tip] Call `.persist.hydrate()` after app bootstrap when using SSR or guards.

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/persist/functions) | `withStorage`, adapters, serializers |
| [Guides & Concepts](/docs/packages/persist/guides/storage-adapters) | Hydrate, migrate, TTL |

Each API page: **Usage** → **Type Declarations** → **API** (see [withStorage](/docs/packages/persist/api/with-storage)).
