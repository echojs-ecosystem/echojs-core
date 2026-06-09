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

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/network-http/functions) | `createHttpClient`, hooks, errors |
| [Guides & Concepts](/docs/packages/network-http/guides/important-defaults) | Client composition, retries |

Each API page: **Usage** → **Type Declarations** → **API** (see [createHttpClient](/docs/packages/network-http/api/create-http-client)).

> [!tip] Import the **`/http` subpath** only — `/ws`, `/mock`, `/graphql` are separate entry points.
