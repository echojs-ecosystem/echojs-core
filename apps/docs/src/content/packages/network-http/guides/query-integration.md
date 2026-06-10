---
title: Query Integration
description:
  Use @echojs-ecosystem/network/http inside createQuery queryFn functions.
package: '@echojs-ecosystem/network'
---

# Query Integration

`@echojs-ecosystem/network/http` is the recommended transport for
`@echojs-ecosystem/async` `queryFn` implementations. Forward the query
`signal` for automatic cancellation.

## Shared API client

```ts
// shared/api/http.ts
import { createHttpClient } from '@echojs-ecosystem/network/http'

export const http = createHttpClient({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: { accept: 'application/json' },
})
```

## Query definition

```ts
import { createQuery } from '@echojs-ecosystem/async'
import { http } from '@/shared/api/http'

type User = { id: number; name: string }

export const userQuery = createQuery<User>({
  name: 'user',
  queryKey: ({ id }) => ['users', id] as const,
  queryFn: async ({ params, signal }) => {
    return http
      .get(`/users/${params.id}`, { signal })
      .unwrapJson<User>()
  },
})
```

## Why unwrapJson()

| Method          | Behavior                                      |
| --------------- | --------------------------------------------- |
| `.json<T>()`    | Parse body; status errors already thrown      |
| `.unwrapJson<T>()` | `assertOk()` + `json<T>()` in one step     |
| `.raw()`        | No status throw — handle errors manually      |

Default `throwHttpErrors: true` means 4xx/5xx throw `HTTPStatusError` before
JSON parsing.

## Mutations

```ts
export const updateUserMutation = createMutation({
  name: 'update-user',
  mutationFn: async ({ id, patch }) => {
    return http
      .patch(`/users/${id}`, { json: patch })
      .unwrapJson<User>()
  },
})
```

## Per-feature clients

```ts
const billingHttp = http.extend({
  baseUrl: '/billing',
  hooks: {
    beforeRequest: [
      async () => {
        /* attach billing scope header */
      },
    ],
  },
})
```

## Related

- [Query Definitions](/docs/packages/async/guides/query-definitions)
- [Abort & Cancellation](/docs/packages/async/guides/abort-and-cancellation)
- [Client Composition](/docs/packages/network-http/guides/client-composition)
