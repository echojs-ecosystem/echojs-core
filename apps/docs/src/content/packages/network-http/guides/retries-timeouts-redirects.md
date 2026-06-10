---
title: Retries, Timeouts & Redirects
description:
  Configure retry budgets, abort signals, timeouts, and redirect following.
package: '@echojs-ecosystem/network'
---

# Retries, Timeouts & Redirects

## Retries

Retries run only when `retry.limit > 0` and the failure matches configured
methods, status codes, or network error codes.

```ts
const api = createHttpClient({
  retry: {
    limit: 3,
    methods: ['GET', 'POST'],
    statusCodes: [429, 503],
    calculateDelay: ({ attempt }) => Math.min(1000 * 2 ** attempt, 10_000),
  },
})
```

`beforeRetry` hooks run before each attempt. `RetryError` is thrown when the
budget is exhausted.

### afterResponse retry directive

An `afterResponse` hook can return `{ kind: 'retry', delayMs?: number }` to
trigger a controlled retry after a successful HTTP response (e.g. stale token).

## Timeouts

```ts
const api = createHttpClient({
  timeout: {
    request: 10_000,  // entire operation budget (best-effort)
    response: 5_000,  // until response headers
    read: 30_000,     // body read phase
  },
})
```

Timeout failures throw `TimeoutError` with a `phase` field (`request` | `response` | `read`).

> [!note] Timeout behavior is adapter-aware and best-effort on some runtimes.

## AbortSignal

Pass `signal` on the client or per request. Aborts throw `AbortError`.

```ts
const controller = new AbortController()
const p = api.get('/slow', { signal: controller.signal })
controller.abort()
```

Works naturally with `@echojs-ecosystem/async` — forward `signal` from `queryFn`.

## Redirects

```ts
const api = createHttpClient({
  redirect: {
    follow: true,
    max: 5,
    keepMethod: false,
    strictOrigin: false,
    stripSensitiveHeaders: true,
  },
})
```

| Option                   | Effect                                              |
| ------------------------ | --------------------------------------------------- |
| `follow: false`          | Do not follow redirects                             |
| `keepMethod: true`       | Preserve method on 307/308                          |
| `strictOrigin: true`     | Reject cross-origin redirects                       |
| `stripSensitiveHeaders`  | Drop auth/cookie headers on cross-origin redirect   |

`beforeRedirect` hooks observe each hop.

## raw() and stream()

```ts
// No throw on 4xx/5xx
const res = await api.raw({ url: '/status/418' })

// Streaming body (adapter must support it)
const res = await api.stream({ url: '/events', responseType: 'stream' })
```

## Related

- [Important Defaults](/docs/packages/network-http/guides/important-defaults)
- [Errors](/docs/packages/network-http/api/errors)
