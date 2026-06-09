---
title: Examples
description:
  REST client, auth headers, and error handling with @echojs-ecosystem/network/http.
package: '@echojs-ecosystem/network'
---

# Examples

Focused patterns for the HTTP client. Each example is copy-paste ready.

## Pick an example

| Example                                                                    | Teaches                          |
| -------------------------------------------------------------------------- | -------------------------------- |
| [REST API Client](/docs/packages/network-http/examples/rest-api)           | CRUD + search params             |
| [Auth & Headers](/docs/packages/network-http/examples/auth-and-headers)    | `withAuth`, tenants, tracing     |
| [Error Handling](/docs/packages/network-http/examples/error-handling)      | Guards, `raw()`, status errors   |

## Shared pattern

Create one module-scoped client, extend per feature:

```ts
// shared/api/http.ts
import { createHttpClient } from '@echojs-ecosystem/network/http'

export const http = createHttpClient({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: { accept: 'application/json' },
})
```

## Related

- [Guides & Concepts](/docs/packages/network-http/guides/important-defaults)
- [Functions](/docs/packages/network-http/functions)
- [Query Integration](/docs/packages/network-http/guides/query-integration)
