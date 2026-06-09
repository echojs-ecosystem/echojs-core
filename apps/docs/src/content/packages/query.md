---
title: Query
description:
  Signal-native async cache for models — queries, mutations, invalidation.
package: '@echojs-ecosystem/query'
keywords: [createQuery, createMutation, queryClient]
---

:::package-overview query

:::install @echojs-ecosystem/query

## Quick start

```ts
import { createQuery } from '@echojs-ecosystem/query'

const userQuery = createQuery({
  queryKey: ['user', id] as const,
  queryFn: ({ signal }) => fetchUser(id, { signal }),
})
```

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/query/functions) | API index — queries, mutations, client |
| [Guides & Concepts](/docs/packages/query/guides/query-definitions) | Definitions, cache, cancellation |

Each API page: **Usage** → **Type Declarations** → **API** (see [createQuery](/docs/packages/query/api/create-query)).

> [!tip] Bind `.with(() => params)` inside `createModel`, not in views.
