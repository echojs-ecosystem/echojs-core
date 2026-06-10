---
title: JSONPlaceholder
description:
  listUsersQuery and getUserQuery definitions from the query demo feature.
package: '@echojs-ecosystem/async'
---

# JSONPlaceholder

The query demo feature in the EchoJS example app fetches users from
JSONPlaceholder — a minimal pattern for list + detail queries.

## Problem

Load a user list and fetch individual users by ID with proper cache keys and
abort support.

## Definitions

```ts
import { createQuery } from '@echojs-ecosystem/async'
import { jpFetch } from '@core/api/jsonplaceholder.js'

export const listUsersQuery = createQuery({
  name: 'jp-users',
  queryKey: () => ['jsonplaceholder', 'users'] as const,
  queryFn: ({ signal }) => jpFetch('/users', { signal }),
})

export const getUserQuery = createQuery({
  name: 'jp-user',
  queryKey: ({ id }: { id: number }) =>
    ['jsonplaceholder', 'user', id] as const,
  keepPreviousData: true,
  abortPrevious: true,
  queryFn: ({ params, signal }) => jpFetch(`/users/${params.id}`, { signal }),
})
```

## Key points

- **`queryKey`** includes all param fields — `{ id }` in the key tuple
- **`keepPreviousData`** avoids flicker when switching users
- **`abortPrevious`** cancels stale fetches when ID changes
- **`signal`** passed to `jpFetch` for proper cancellation

## Live reference

| Resource          | Path                                                                  |
| ----------------- | --------------------------------------------------------------------- |
| Query definitions | `apps/example/src/features/query-demo/api/jsonplaceholder.queries.ts` |

## See also

- [Examples: Query Demo Model](/docs/packages/async/examples/query-demo-model)
- [Guides: Query Definitions](/docs/packages/async/guides/query-definitions)
