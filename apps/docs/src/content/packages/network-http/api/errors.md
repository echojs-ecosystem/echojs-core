---
title: Errors
description: Typed HTTP error hierarchy and type guards.
package: '@echojs-ecosystem/network'
keywords: [Errors, network-http]
---

@echojs-ecosystem/network/http

## Usage

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

## Type Declarations

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

## API
