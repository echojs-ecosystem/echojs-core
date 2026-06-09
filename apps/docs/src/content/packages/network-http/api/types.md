---
title: Types
description: HttpResponse, adapters, timings, and shared type exports.
package: '@echojs-ecosystem/network'
keywords: [Types, network-http]
---

@echojs-ecosystem/network/http

## Usage

```ts
interface HttpResponse<TBody = unknown> {
  readonly url: string
  readonly status: number
  readonly statusText: string
  readonly ok: boolean
  readonly headers: HttpHeaders
  readonly body: TBody
  readonly rawBody?: Uint8Array
  readonly timings?: HttpTimings
  readonly request: Readonly<NormalizedRequestOptions>
  readonly retryCount: number

  json<T>(): Promise<T>
  text(): Promise<string>
  bytes(): Promise<Uint8Array>
  arrayBuffer(): Promise<ArrayBuffer>
  assertOk(): void
  unwrapJson<T>(): Promise<T>
}
```

## Type Declarations

```ts
interface HttpResponse<TBody = unknown> {
  readonly url: string
  readonly status: number
  readonly statusText: string
  readonly ok: boolean
  readonly headers: HttpHeaders
  readonly body: TBody
  readonly rawBody?: Uint8Array
  readonly timings?: HttpTimings
  readonly request: Readonly<NormalizedRequestOptions>
  readonly retryCount: number

  json<T>(): Promise<T>
  text(): Promise<string>
  bytes(): Promise<Uint8Array>
  arrayBuffer(): Promise<ArrayBuffer>
  assertOk(): void
  unwrapJson<T>(): Promise<T>
}
```

## API
