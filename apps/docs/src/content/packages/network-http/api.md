---
title: API Reference
description: Complete @echojs-ecosystem/network/http public API index.
package: '@echojs-ecosystem/network'
---

# API Reference

Public exports from `@echojs-ecosystem/network/http`:

```ts
import {
  createHttpClient,
  fetchAdapter,
  HttpClientError,
  HTTPStatusError,
  isHttpError,
  isStatusError,
  mergeRequestOptions,
  normalizeRequestOptions,
} from '@echojs-ecosystem/network/http'
```

## Client

| Export                                                          | Description                          |
| --------------------------------------------------------------- | ------------------------------------ |
| [createHttpClient](/docs/packages/network-http/api/create-http-client) | Factory — returns immutable `HttpClient` |
| `HttpClient`                                                    | Interface — verbs, `extend`, hooks   |
| `HttpRequestPromise`                                            | Promise + `.json()` / `.text()` shortcuts |

## Request model

| Export                                                              | Description                    |
| ------------------------------------------------------------------- | ------------------------------ |
| [RequestOptions](/docs/packages/network-http/api/request-options)   | Per-request and client defaults |
| [Hooks](/docs/packages/network-http/api/hooks)                      | Lifecycle hook buckets         |
| [Types](/docs/packages/network-http/api/types)                      | `HttpResponse`, adapters, timings |

## Errors

| Export                                                        | Description              |
| ------------------------------------------------------------- | ------------------------ |
| [Errors](/docs/packages/network-http/api/errors)              | Typed error hierarchy    |
| `isHttpError`, `isStatusError`, `isNetworkError`, …           | Type guards              |

## Adapters

| Export          | Description                                      |
| --------------- | ------------------------------------------------ |
| `fetchAdapter`  | Default browser/Node Fetch adapter               |
| `HttpAdapter`   | Custom transport interface (advanced)            |

## Options utilities

| Export                    | Description                              |
| ------------------------- | ---------------------------------------- |
| `mergeRequestOptions`     | Deep-merge options + hook arrays           |
| `normalizeRequestOptions` | Build normalized internal request model  |
| `mergeAndNormalize`       | Merge then normalize in one step         |
| `validateRequestOptions`  | Throw on invalid option combinations     |

## Guides

Conceptual docs live under [Guides & Concepts](/docs/packages/network-http/guides/important-defaults):

- [Important Defaults](/docs/packages/network-http/guides/important-defaults)
- [Client Composition](/docs/packages/network-http/guides/client-composition)
- [Query Integration](/docs/packages/network-http/guides/query-integration)

## EchoJS vs axios / ky

| axios / ky              | `@echojs-ecosystem/network/http`              |
| ----------------------- | --------------------------------------------- |
| Instance interceptors   | Hook buckets + `onRequest` / `onResponse`     |
| `axios.create()`        | `createHttpClient()` + `extend()`             |
| `response.data`         | `.json()` / `HttpResponse` helpers            |
| Throws on 4xx/5xx       | Default `throwHttpErrors: true` (configurable)|
