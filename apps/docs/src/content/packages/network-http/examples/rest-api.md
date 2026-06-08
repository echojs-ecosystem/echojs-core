---
title: REST API Client
description: CRUD requests with search params and JSON bodies.
package: '@echojs-ecosystem/network'
---

# REST API Client

```ts
import { createHttpClient } from '@echojs-ecosystem/network/http'

type User = { id: number; name: string; email: string }

const api = createHttpClient({
  baseUrl: 'https://api.example.com',
  headers: { accept: 'application/json' },
})

// List with query params
const users = await api
  .get('/users', { searchParams: { page: 1, limit: 20 } })
  .json<User[]>()

// Create
const created = await api
  .post('/users', { json: { name: 'Ada', email: 'ada@example.com' } })
  .unwrapJson<User>()

// Update
await api.patch(`/users/${created.id}`, {
  json: { name: 'Ada Lovelace' },
})

// Delete
await api.delete(`/users/${created.id}`)
```

## Feature module

```ts
// entities/user/api/users.api.ts
import { http } from '@/shared/api/http'
import type { User } from '../model/user.types'

export const listUsers = (page: number) =>
  http.get('/users', { searchParams: { page } }).json<User[]>()

export const getUser = (id: number) =>
  http.get(`/users/${id}`).unwrapJson<User>()
```

## Related

- [Query Integration](/docs/packages/network-http/guides/query-integration)
- [Client Composition](/docs/packages/network-http/guides/client-composition)
