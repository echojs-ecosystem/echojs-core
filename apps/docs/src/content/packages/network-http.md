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

## Key APIs

| Export | Role |
| ------ | ---- |
| [`createHttpClient`](/docs/packages/network-http/api/create-http-client) | Immutable client with `get` / `post` / `json()` |
| [`Hooks`](/docs/packages/network-http/api/hooks) | Request/response middleware chain |
| [`Errors`](/docs/packages/network-http/api/errors) | Typed HTTP and network failures |
| Client composition | `.extend()` for auth headers, base URL, retries |

## Common patterns

- Create one **`api` client** per backend in `shared/api` or `entities/*/api`.
- Use **`api.get('/users').json<User[]>()`** inside `createQuery` `queryFn`.
- Import **`/http` subpath only** — WebSocket and GraphQL are separate entries.

> [!tip] Import the **`/http` subpath** only — `/ws`, `/mock`, `/graphql` are separate entry points.

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/network-http/functions) | `createHttpClient`, hooks, errors |
| [Guides & Concepts](/docs/packages/network-http/guides/important-defaults) | Client composition, retries |

Each API page: **Usage** → **Type Declarations** → **API** (see [createHttpClient](/docs/packages/network-http/api/create-http-client)).
