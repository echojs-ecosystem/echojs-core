---
title: Hooks & Middleware
description:
  init, beforeRequest, afterResponse, beforeError, and hook composition.
package: '@echojs-ecosystem/network'
---

# Hooks & Middleware

Hooks are the extension point for auth tokens, logging, metrics, and response
transformation. They are grouped into **buckets**; arrays concatenate on
`extend()`.

## Hook buckets

| Bucket           | When it runs                         | Can return                |
| ---------------- | ------------------------------------ | ------------------------- |
| `init`           | After normalize, before transport    | `void`                    |
| `beforeRequest`  | Right before adapter call            | `void`                    |
| `beforeRedirect` | Before following a redirect          | `void`                    |
| `beforeRetry`    | Before a retry attempt               | `void`                    |
| `afterResponse`  | After response received              | `ResponseLike`, retry directive, or `void` |
| `beforeError`    | Before error propagates to caller    | Replacement `Error`       |

## Declarative hooks

```ts
const api = createHttpClient({
  hooks: {
    beforeRequest: [
      async ({ normalized, context }) => {
        context.startedAt = Date.now()
      },
    ],
    afterResponse: [
      async ({ response, context }) => {
        console.log('ms', Date.now() - (context.startedAt as number))
      },
    ],
    beforeError: [
      async ({ error }) => {
        if (isStatusError(error) && error.status === 401) {
          // refresh token, return a new error, etc.
        }
        return error as Error
      },
    ],
  },
})
```

## Fluent hook facades

```ts
const api = createHttpClient({ baseUrl: '/api' })
  .onRequest(async (ctx) => { /* ... */ })
  .onResponse(async (ctx) => { /* ... */ })
  .onError(async (ctx) => ctx.error as Error)
  .onRetry(async (ctx) => { /* ... */ })
  .onRedirect(async (ctx) => { /* ... */ })
```

Each facade appends one hook to the corresponding bucket via `extend()`.

## Shared context

`context` is a mutable bag shared across hooks for a single request. Set values in
`beforeRequest` and read them in `afterResponse` or `beforeError`.

```ts
hooks: {
  beforeRequest: [
    ({ context }) => {
      context.requestId = crypto.randomUUID()
    },
  ],
}
```

Prefer `tracing.requestIdHeader` when you only need a header injected.

## Replacing responses

`afterResponse` may return a `ResponseLike` to short-circuit parsing. Return
`{ kind: 'retry', delayMs: 500 }` to schedule a retry.

## Related

- [Hooks API](/docs/packages/network-http/api/hooks)
- [Client Composition](/docs/packages/network-http/guides/client-composition)
