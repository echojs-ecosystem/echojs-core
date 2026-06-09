---
title: Hooks
description: HttpHooks types and hook context shapes.
package: '@echojs-ecosystem/network'
keywords: [Hooks, network-http]
---

@echojs-ecosystem/network/http

## Usage

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

## Type Declarations

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

## API

### Returns

`Hooks` — see Type Declarations for the full signature.
