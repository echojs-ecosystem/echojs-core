---
title: Errors
description: Typed HTTP error hierarchy and type guards.
package: '@echojs-ecosystem/network'
---

# Errors

All client failures extend `HttpClientError` with structured metadata:
`code`, `request`, `response`, `timings`, `retryCount`, `context`, `requestId`.

## Hierarchy

| Class             | `code`           | When thrown                          |
| ----------------- | ---------------- | ------------------------------------ |
| `HTTPStatusError` | `HTTP_STATUS`    | Non-2xx when `throwHttpErrors: true` |
| `NetworkError`    | `NETWORK`        | Transport failure                    |
| `TimeoutError`    | `TIMEOUT`        | Timeout exceeded (`phase` field)     |
| `AbortError`      | `ABORT`          | `AbortSignal` aborted                |
| `ParseError`      | `PARSE`          | Body parse failure                   |
| `RetryError`      | `RETRY_EXHAUSTED`| Retry budget exhausted               |
| `RedirectError`   | `REDIRECT`       | Too many redirects                   |
| `RequestError`    | `REQUEST`        | Invalid request configuration        |

## HttpClientError fields

| Field                   | Description                              |
| ----------------------- | ---------------------------------------- |
| `code`                  | `HttpErrorCode` discriminator            |
| `request`               | Normalized request snapshot              |
| `response`              | Response when available                  |
| `requestId`             | From tracing when configured             |
| `status`                | HTTP status when applicable              |
| `responseBodyPreview`   | Truncated body on status errors          |
| `cause`                 | Underlying error                         |

## Type guards

```ts
import {
  isHttpError,
  isStatusError,
  isNetworkError,
  isTimeoutError,
  isAbortError,
} from '@echojs-ecosystem/network/http'

try {
  await api.get('/users').json()
} catch (e) {
  if (isStatusError(e) && e.status === 404) {
    // not found
  }
  if (isAbortError(e)) {
    // cancelled
  }
  if (isHttpError(e)) {
    console.log(e.code, e.requestId)
  }
}
```

## HTTPStatusError

Thrown by default on 4xx/5xx. Access `status`, `headers`, and
`responseBodyPreview` for logging or UI.

```ts
await api.get('/boom').catch((e) => {
  if (e instanceof HTTPStatusError) {
    console.log(e.status, e.responseBodyPreview)
  }
})
```

## beforeError hook

Transform or replace errors before they reach the caller:

```ts
hooks: {
  beforeError: [
    async ({ error }) => {
      if (isStatusError(error) && error.status === 401) {
        return new Error('Session expired')
      }
      return error as Error
    },
  ],
}
```

## Related

- [Important Defaults](/docs/packages/network-http/guides/important-defaults)
- [Error Handling example](/docs/packages/network-http/examples/error-handling)
