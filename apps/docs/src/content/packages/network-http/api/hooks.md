---
title: Hooks
description: HttpHooks types and hook context shapes.
package: '@echojs-ecosystem/network'
---

# Hooks

Hook types exported from `@echojs-ecosystem/network/http`.

## HttpHooks

```ts
interface HttpHooks {
  init: Array<(plain, normalized) => void>
  beforeRequest: Array<(ctx: BeforeRequestContext) => void | Promise<void>>
  beforeRedirect: Array<(ctx: BeforeRedirectContext) => void | Promise<void>>
  beforeRetry: Array<(ctx: BeforeRetryContext) => void | Promise<void>>
  afterResponse: Array<
    (ctx: AfterResponseContext) => AfterResponseHookResult | Promise<AfterResponseHookResult>
  >
  beforeError: Array<(ctx: BeforeErrorContext) => Error | Promise<Error>>
}
```

Pass `Partial<HttpHooks>` in `RequestOptions.hooks`. Omitted buckets default to
empty arrays. On `extend()`, each bucket is **concatenated**.

## Context types

### BeforeRequestContext

| Field        | Description                    |
| ------------ | ------------------------------ |
| `plain`      | Merged public options          |
| `normalized` | Normalized request model       |
| `signal`     | AbortSignal for this attempt   |
| `context`    | Shared mutable hook bag        |

### AfterResponseContext

| Field        | Description                    |
| ------------ | ------------------------------ |
| `response`   | `HttpResponse` instance        |
| `normalized` | Request that produced response |
| `context`    | Shared hook bag                |

### BeforeErrorContext

| Field        | Description                    |
| ------------ | ------------------------------ |
| `error`      | Thrown value                   |
| `normalized` | Request options (if available) |
| `context`    | Shared hook bag                |

### BeforeRetryContext

| Field        | Description                    |
| ------------ | ------------------------------ |
| `error`      | Failure triggering retry       |
| `attempt`    | 1-based attempt index          |
| `retryCount` | Retries so far                 |
| `normalized` | Request being retried          |
| `context`    | Shared hook bag                |

### BeforeRedirectContext

| Field           | Description              |
| --------------- | ------------------------ |
| `from`          | Current normalized req   |
| `toUrl`         | Redirect target          |
| `status`        | Redirect status code     |
| `redirectIndex` | Hop index                |
| `context`       | Shared hook bag          |

## AfterResponseHookResult

```ts
type AfterResponseHookResult =
  | ResponseLike
  | AfterResponseRetryDirective
  | void
  | undefined

interface AfterResponseRetryDirective {
  kind: 'retry'
  delayMs?: number
}
```

## ResponseLike

Minimal response shape hooks can return to replace the upstream result:

```ts
interface ResponseLike {
  url: string
  status: number
  statusText: string
  ok: boolean
  headers: Headers
  body: ReadableStream<Uint8Array> | null
  clone(): ResponseLike
}
```

## Related

- [Hooks & Middleware](/docs/packages/network-http/guides/hooks-and-middleware)
- [RequestOptions](/docs/packages/network-http/api/request-options)
