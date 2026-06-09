---
title: createHttpClient
description: Factory for immutable HttpClient instances.
package: '@echojs-ecosystem/network'
keywords: [createHttpClient, network-http]
---

@echojs-ecosystem/network/http

## Usage

```ts
const api = createHttpClient({ baseUrl: 'https://api.example.com' })

const users = await api.get('/users').json<User[]>()

const created = await api
  .post('/users', { json: { name: 'Ada' } })
  .unwrapJson<User>()
```

## Type Declarations

```ts
import { createHttpClient } from '@echojs-ecosystem/network/http'

function createHttpClient(defaults?: RequestOptions): HttpClient
```

## API

### Returns

`createHttpClient` — see Type Declarations for the full signature.
