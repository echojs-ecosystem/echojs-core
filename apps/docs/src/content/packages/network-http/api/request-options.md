---
title: RequestOptions
description: Per-request and client-default options for HTTP calls.
package: '@echojs-ecosystem/network'
keywords: [RequestOptions, network-http]
---

@echojs-ecosystem/network/http

## Usage

```ts
retry?: {
  limit?: number
  methods?: HttpMethodInput[]
  statusCodes?: number[]
  errorCodes?: string[]
  calculateDelay?: (ctx: RetryContext) => number
}
```

## Type Declarations

```ts
retry?: {
  limit?: number
  methods?: HttpMethodInput[]
  statusCodes?: number[]
  errorCodes?: string[]
  calculateDelay?: (ctx: RetryContext) => number
}
```

## API

### Returns

`RequestOptions` — see Type Declarations for the full signature.
