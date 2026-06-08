---
title: Important Defaults
description:
  Default retry, redirect, timeout, and error behavior for the HTTP client.
package: '@echojs-ecosystem/network'
---

# Important Defaults

These defaults apply when you do **not** override options. They are normalized in
`normalizeRequestOptions` before each request.

## HTTP status errors

| Option              | Default | Behavior                                      |
| ------------------- | ------- | --------------------------------------------- |
| `throwHttpErrors`   | `true`  | Non-2xx responses throw `HTTPStatusError`     |

Use `client.raw()` or `throwHttpErrors: false` when you need the response object
without an exception.

```ts
const res = await api.raw({ url: '/missing' })
// res.status === 404, no throw
```

## Retries

| Option                    | Default                                              |
| ------------------------- | ---------------------------------------------------- |
| `retry.limit`             | `0` (disabled)                                       |
| `retry.methods`           | `GET`, `HEAD`, `OPTIONS`                             |
| `retry.statusCodes`       | `408`, `413`, `429`, `500`, `502`, `503`, `504`      |
| `retry.errorCodes`        | `ECONNRESET`, `EPIPE`, `ETIMEDOUT`, `UND_ERR_CONNECT_TIMEOUT` |

Enable retries per client or per request:

```ts
const api = createHttpClient({
  retry: { limit: 2, methods: ['GET'], statusCodes: [503] },
})
```

When the retry budget is exhausted, the client throws `RetryError`.

## Redirects

| Option                            | Default   |
| --------------------------------- | --------- |
| `redirect.follow`                 | `true`    |
| `redirect.max`                    | `10`      |
| `redirect.keepMethod`             | `false`   |
| `redirect.strictOrigin`           | `false`   |
| `redirect.stripSensitiveHeaders`  | `true`    |

Exceeding `redirect.max` throws `RedirectError`.

## Response body

| Option          | Default   | Notes                                    |
| --------------- | --------- | ---------------------------------------- |
| `responseType`  | `"bytes"` | Use `"json"` / `"text"` / `"stream"` explicitly |
| `decompress`    | `true`    | Adapter-aware                            |

## Tracing

| Option                              | Default   |
| ----------------------------------- | --------- |
| `tracing.errorBodyPreviewBytes`     | `1024`    |

When `tracing.requestIdHeader` is set, a request id is generated and injected
into headers unless already present.

## Immutable clients

`createHttpClient`, `extend()`, `withHeader()`, and hook facades return **new**
client instances. Parent defaults are never mutated.

```ts
const base = createHttpClient({ baseUrl: '/api' })
const v2 = base.extend({ headers: { 'api-version': '2' } })
// base.defaults unchanged
```

## Related

- [Retries, Timeouts & Redirects](/docs/packages/network-http/guides/retries-timeouts-redirects)
- [RequestOptions](/docs/packages/network-http/api/request-options)
