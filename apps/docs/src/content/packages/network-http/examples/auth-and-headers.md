---
title: Auth & Headers
description: Bearer tokens, tenant headers, and request id tracing.
package: '@echojs-ecosystem/network'
---

# Auth & Headers

## Bearer token

```ts
import { createHttpClient } from '@echojs-ecosystem/network/http'

function createAuthedClient(token: string) {
  return createHttpClient({ baseUrl: '/api' }).withAuth(token, {
    scheme: 'Bearer',
  })
}

const api = createAuthedClient(sessionToken)
await api.get('/me').unwrapJson<{ id: string }>()
```

`withAuth(value, { scheme?, headerName? })` defaults to the `authorization`
header.

## Multi-tenant header

```ts
const tenantApi = createHttpClient({ baseUrl: '/api' }).withHeaders({
  'x-tenant-id': 'acme',
  accept: 'application/json',
})
```

## Request id tracing

```ts
const api = createHttpClient({
  baseUrl: '/api',
  tracing: {
    requestIdHeader: 'x-request-id',
    generateRequestId: () => crypto.randomUUID(),
  },
})
```

The id is injected on every request unless `x-request-id` is already set.
`HTTPStatusError` includes `requestId` for log correlation.

## Dynamic token per call

Derive a client when the token changes (login/logout):

```ts
import { http } from '@/shared/api/http'

export function authedApi(accessToken: string) {
  return http.withAuth(accessToken, { scheme: 'Bearer' })
}

// in a model or queryFn
await authedApi(session.token).get('/me').unwrapJson<Profile>()
```

> [!tip] Store the session in `@echojs-ecosystem/store` and call
> `authedApi(store.token())` inside `queryFn` — the client instance is cheap to
> create because defaults are merged, not reconfigured globally.

## Related

- [Hooks & Middleware](/docs/packages/network-http/guides/hooks-and-middleware)
- [Client Composition](/docs/packages/network-http/guides/client-composition)
