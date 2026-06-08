---
title: Error Handling
description: Status errors, type guards, and raw responses.
package: '@echojs-ecosystem/network'
---

# Error Handling

## Default — throw on 4xx/5xx

```ts
import {
  createHttpClient,
  HTTPStatusError,
  isStatusError,
} from '@echojs-ecosystem/network/http'

const api = createHttpClient({ baseUrl: '/api' })

try {
  await api.get('/users/404').json()
} catch (e) {
  if (isStatusError(e)) {
    console.log(e.status, e.responseBodyPreview)
  }
}
```

## raw() — inspect status without throw

```ts
const res = await api.raw({ url: '/health' })

if (res.ok) {
  const body = await res.json<{ status: string }>()
} else {
  console.warn('degraded', res.status)
}
```

## Per-request override

```ts
await api.get('/maybe-404', { throwHttpErrors: false }).then(async (res) => {
  if (!res.ok) return null
  return res.json<Item>()
})
```

## Parse errors

Invalid JSON on a 200 response throws `ParseError`:

```ts
import { ParseError } from '@echojs-ecosystem/network/http'

await api
  .get('/broken-json', { throwHttpErrors: false })
  .json()
  .catch((e) => {
    if (e instanceof ParseError) {
      // handle malformed payload
    }
  })
```

## Retry exhaustion

```ts
import { RetryError } from '@echojs-ecosystem/network/http'

const api = createHttpClient({
  baseUrl: '/api',
  retry: { limit: 2, statusCodes: [503] },
})

await api.get('/flaky').catch((e) => {
  if (e instanceof RetryError) {
    console.log('attempts', e.retryCount)
  }
})
```

## Related

- [Errors API](/docs/packages/network-http/api/errors)
- [Retries, Timeouts & Redirects](/docs/packages/network-http/guides/retries-timeouts-redirects)
