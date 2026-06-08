---
title: Installation
description:
  Install @echojs-ecosystem/network and import the /http subpath.
package: '@echojs-ecosystem/network'
---

# Installation

`@echojs-ecosystem/network` is a meta-package with **tree-shakeable subpath exports**.
The HTTP client lives at `@echojs-ecosystem/network/http`.

## Import paths

| Path                                        | When to use                                                    |
| ------------------------------------------- | -------------------------------------------------------------- |
| `@echojs-ecosystem/network/http`            | À la carte — explicit dependency in `package.json`             |
| `@echojs-ecosystem/framework/network/http`  | You already use the framework meta-package                     |

```ts
// Standalone subpath
import { createHttpClient } from '@echojs-ecosystem/network/http'

// Same API via framework
import { createHttpClient } from '@echojs-ecosystem/framework/network/http'
```

> [!tip] Pick **one style per app** and stay consistent.

## Quick install

:::install @echojs-ecosystem/network

Or install the full framework once:

:::install @echojs-ecosystem/framework

## Requirements

| Requirement        | Notes                                              |
| ------------------ | -------------------------------------------------- |
| **TypeScript** 5.x | Typed `RequestOptions`, `HttpResponse`, errors     |
| **ESM bundler**    | Vite, Bun, webpack with ESM output                 |
| **`fetch`**        | Default adapter uses the platform Fetch API        |

## Verify the import

```ts
import { createHttpClient } from '@echojs-ecosystem/network/http'

const api = createHttpClient({ baseUrl: 'https://httpbin.org' })
const res = await api.get('/get').unwrapJson<{ url: string }>()
console.log(res.url)
```

## Related subpaths

| Subpath     | Status   | Description              |
| ----------- | -------- | ------------------------ |
| `/http`     | Stable   | HTTP client (this doc)   |
| `/ws`       | Stub     | WebSocket client         |
| `/mock`     | Stub     | Request mocking          |
| `/graphql`  | Stub     | GraphQL client           |

## Next steps

- [Important Defaults](/docs/packages/network-http/guides/important-defaults) — retries, errors, redirects
- [Client Composition](/docs/packages/network-http/guides/client-composition) — `extend`, `withAuth`, headers
- [API Reference](/docs/packages/network-http/api) — full export index
