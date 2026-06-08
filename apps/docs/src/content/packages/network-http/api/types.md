---
title: Types
description: HttpResponse, adapters, timings, and shared type exports.
package: '@echojs-ecosystem/network'
---

# Types

Key types re-exported from `@echojs-ecosystem/network/http`.

## HttpResponse

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

## HttpRequestPromise

```ts
type HttpRequestPromise<T = unknown> = Promise<HttpResponse<T>> & {
  json<R = unknown>(): Promise<R>
  text(): Promise<string>
  bytes(): Promise<Uint8Array>
  arrayBuffer(): Promise<ArrayBuffer>
  unwrapJson<R = unknown>(): Promise<R>
}
```

## HttpAdapter

Custom transport for non-Fetch environments or testing:

```ts
interface HttpAdapter {
  (ctx: AdapterContext): Promise<AdapterResponse>
}
```

Use `adapter` in `RequestOptions` or pass a custom adapter when constructing
advanced clients. Default: `fetchAdapter`.

## HttpTimings

Per-phase timing metadata attached to responses when available (`dns`, `connect`,
`tls`, `request`, `response`, `read`, `total`).

## Method & init types

| Type                  | Description                          |
| --------------------- | ------------------------------------ |
| `HttpMethod`          | Uppercase verb union                 |
| `HttpMethodInput`     | Accepts lowercase input              |
| `HeadersInitLike`     | Headers, record, or iterable pairs   |
| `SearchParamsInitLike`| Query param shapes                   |
| `BodyInitLike`        | Fetch-compatible body types          |
| `HttpClientDefaults`  | `Readonly<RequestOptions>`           |
| `HttpErrorCode`       | Error discriminator strings          |

## NormalizedRequestOptions

Internal normalized model — exported for advanced hooks and adapters. Prefer
`RequestOptions` in application code.

## Related

- [createHttpClient](/docs/packages/network-http/api/create-http-client)
- [RequestOptions](/docs/packages/network-http/api/request-options)
