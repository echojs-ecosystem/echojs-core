---
title: RequestOptions
description: Per-request and client-default options for HTTP calls.
package: '@echojs-ecosystem/network'
---

# RequestOptions

`RequestOptions` is the object-first API for every request. Set fields on
`createHttpClient()` for defaults, then override per call.

## URL & method

| Field           | Type                    | Description                |
| --------------- | ----------------------- | -------------------------- |
| `method`        | `HttpMethodInput`       | Verb (normalized uppercase)|
| `url`           | `string \| URL`         | Path or absolute URL       |
| `baseUrl`       | `string \| URL`         | Prepended to relative URLs |
| `searchParams`  | `SearchParamsInitLike`  | Query string               |

## Headers & body

| Field     | Type              | Description                    |
| --------- | ----------------- | ------------------------------ |
| `headers` | `HeadersInitLike` | Request headers                |
| `json`    | `unknown`         | JSON-serialized body           |
| `form`    | `Record \| URLSearchParams` | Form body              |
| `body`    | `BodyInitLike`    | Raw body                       |

## Behavior

| Field              | Type      | Default   | Description                 |
| ------------------ | --------- | --------- | --------------------------- |
| `throwHttpErrors`  | `boolean` | `true`    | Throw on non-2xx            |
| `responseType`     | `string`  | `"bytes"` | `json`, `text`, `bytes`, `stream` |
| `decompress`       | `boolean` | `true`    | Decompress response         |
| `signal`           | `AbortSignal` | —     | Cancellation                |
| `adapter`          | `HttpAdapter` | `fetchAdapter` | Custom transport   |

## retry

```ts
retry?: {
  limit?: number
  methods?: HttpMethodInput[]
  statusCodes?: number[]
  errorCodes?: string[]
  calculateDelay?: (ctx: RetryContext) => number
}
```

See [Important Defaults](/docs/packages/network-http/guides/important-defaults).

## timeout

```ts
timeout?: {
  request?: number
  response?: number
  read?: number
}
```

Milliseconds per phase. See [Retries, Timeouts & Redirects](/docs/packages/network-http/guides/retries-timeouts-redirects).

## redirect

```ts
redirect?: {
  follow?: boolean
  max?: number
  keepMethod?: boolean
  strictOrigin?: boolean
  stripSensitiveHeaders?: boolean
}
```

## tracing

```ts
tracing?: {
  requestIdHeader?: string
  generateRequestId?: () => string
  errorBodyPreviewBytes?: number
}
```

When `requestIdHeader` is set, ids are injected unless the header already exists.
`HTTPStatusError` may include `requestId` and `responseBodyPreview`.

## hooks & context

| Field     | Type                    | Description                          |
| --------- | ----------------------- | ------------------------------------ |
| `hooks`   | `Partial<HttpHooks>`    | Lifecycle hooks (arrays concatenate) |
| `context` | `Record<string, unknown>` | Shared hook context per request  |

## Utilities

```ts
import {
  mergeRequestOptions,
  normalizeRequestOptions,
  mergeAndNormalize,
  validateRequestOptions,
} from '@echojs-ecosystem/network/http'
```

Useful for custom adapters or testing — most apps only need `createHttpClient`.

## Related

- [Hooks](/docs/packages/network-http/api/hooks)
- [Types](/docs/packages/network-http/api/types)
