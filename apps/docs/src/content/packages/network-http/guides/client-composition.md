---
title: Client Composition
description:
  Layer defaults with extend, withAuth, withBaseUrl, and per-request overrides.
package: '@echojs-ecosystem/network'
---

# Client Composition

`HttpClient` instances are **immutable**. Compose clients at module scope and
reuse them in models, query functions, and API modules.

## createHttpClient

```ts
import { createHttpClient } from '@echojs-ecosystem/network/http'

export const api = createHttpClient({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: { accept: 'application/json' },
  timeout: { request: 15_000 },
})
```

## extend() — layered defaults

`extend()` deep-merges options. Hook arrays are **concatenated**, not replaced.

```ts
const publicApi = api.extend({ baseUrl: '/public' })
const adminApi = api.extend({
  baseUrl: '/admin',
  headers: { authorization: `Bearer ${token}` },
})
```

## Fluent helpers

| Method           | Merges into defaults                |
| ---------------- | ----------------------------------- |
| `withDefaults()` | Alias for `extend()`                |
| `withBaseUrl()`  | `baseUrl`                           |
| `withHeader()`   | Single header                       |
| `withHeaders()`  | Header bag                          |
| `withContext()`  | Shared `context` for hooks          |
| `withAuth()`     | `Authorization` (scheme optional)   |

```ts
const client = createHttpClient()
  .withBaseUrl('https://api.example.com')
  .withHeader('x-tenant', 'acme')
  .withAuth('TOKEN', { scheme: 'Bearer' })
```

## Per-request overrides

Method shortcuts accept a second `RequestOptions` argument:

```ts
await api.get('/users', {
  searchParams: { page: 1, limit: 20 },
  signal: controller.signal,
})
```

## Request body helpers

| Field   | Sends as                          |
| ------- | --------------------------------- |
| `json`  | JSON body + `content-type`        |
| `form`  | `application/x-www-form-urlencoded` or `FormData` |
| `body`  | Raw `BodyInitLike`                |

```ts
await api.post('/users', { json: { name: 'Ada' } })
await api.patch('/users/1', { json: { name: 'Grace' } })
```

## Builder (optional)

For multi-step option stacking before a single call:

```ts
const data = await api
  .builder()
  .with({ headers: { 'x-trace': '1' } })
  .with({ searchParams: { q: 'echo' } })
  .get('/search')
  .json()
```

## Where clients live

| Location              | Pattern                                    |
| --------------------- | ------------------------------------------ |
| `shared/api/client.ts`| App-wide `createHttpClient` instance       |
| `entities/*/api/`     | Feature client via `.extend()`             |
| Query `queryFn`       | Pass `signal` from query context           |

## Related

- [Hooks & Middleware](/docs/packages/network-http/guides/hooks-and-middleware)
- [createHttpClient](/docs/packages/network-http/api/create-http-client)
