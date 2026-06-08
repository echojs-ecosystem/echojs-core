---
title: createHttpClient
description: Factory for immutable HttpClient instances.
package: '@echojs-ecosystem/network'
---

# createHttpClient

```ts
import { createHttpClient } from '@echojs-ecosystem/network/http'

function createHttpClient(defaults?: RequestOptions): HttpClient
```

Creates a client with optional default `RequestOptions`. The returned client is
immutable — use `extend()` or fluent helpers to derive variants.

## HttpClient methods

### HTTP verbs

```ts
client.get(url, options?)
client.head(url, options?)
client.options(url, options?)
client.post(url, options?)
client.put(url, options?)
client.patch(url, options?)
client.delete(url, options?)
client.request(options)
```

Each returns `HttpRequestPromise` — a `Promise<HttpResponse>` augmented with:

| Method        | Description                    |
| ------------- | ------------------------------ |
| `.json<T>()`  | Parse JSON body                |
| `.text()`     | Read text body                 |
| `.bytes()`    | `Uint8Array` body              |
| `.arrayBuffer()` | `ArrayBuffer`               |
| `.unwrapJson<T>()` | Assert ok + parse JSON    |

### Composition

| Method          | Description                         |
| --------------- | ----------------------------------- |
| `extend()`      | New client with merged defaults     |
| `withDefaults()`| Alias for `extend()`                |
| `withBaseUrl()` | Set `baseUrl`                       |
| `withHeader()`  | Add one header                      |
| `withHeaders()` | Merge headers                       |
| `withContext()` | Merge `context` for hooks           |
| `withAuth()`    | Set `Authorization` header          |

### Hooks (fluent)

| Method        | Appends to bucket    |
| ------------- | -------------------- |
| `onRequest()` | `beforeRequest`      |
| `onResponse()`| `afterResponse`      |
| `onError()`   | `beforeError`        |
| `onRetry()`   | `beforeRetry`        |
| `onRedirect()`| `beforeRedirect`     |

### Advanced

| Method      | Description                                      |
| ----------- | ------------------------------------------------ |
| `raw()`     | `throwHttpErrors: false` — returns typed response |
| `stream()`  | `responseType: 'stream'`                         |
| `builder()` | Optional fluent builder before a single call     |

## defaults

```ts
const client = createHttpClient({ baseUrl: '/api' })
client.defaults // Readonly<RequestOptions> — frozen snapshot
```

## Example

```ts
const api = createHttpClient({ baseUrl: 'https://api.example.com' })

const users = await api.get('/users').json<User[]>()

const created = await api
  .post('/users', { json: { name: 'Ada' } })
  .unwrapJson<User>()
```

## Related

- [RequestOptions](/docs/packages/network-http/api/request-options)
- [Client Composition](/docs/packages/network-http/guides/client-composition)
