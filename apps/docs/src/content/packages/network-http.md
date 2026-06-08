---
title: Network / HTTP
description:
  Tree-shakeable HTTP client with hooks, retries, typed responses, and
  immutable client composition.
package: '@echojs-ecosystem/network'
keywords: [createHttpClient, fetch, hooks, retry]
---

:::package-overview network-http

:::install @echojs-ecosystem/network

## Quick start

```ts
import { createHttpClient } from '@echojs-ecosystem/network/http'

const api = createHttpClient({
  baseUrl: 'https://api.example.com',
  headers: { accept: 'application/json' },
})

const users = await api.get('/users').json<User[]>()
```

> [!tip] Import the **`/http` subpath** only — `@echojs-ecosystem/network/ws`, `/mock`, and `/graphql` are separate entry points.
