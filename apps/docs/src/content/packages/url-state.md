---
title: URL State
description: Typed search params with parsers and router integration.
package: '@echojs-ecosystem/url-state'
keywords: [createQueryParams, parseAsString, nuqs]
---

:::package-overview url-state

:::install @echojs-ecosystem/url-state

## Key APIs

| Export | Role |
| ------ | ---- |
| [`createQueryParams`](/docs/packages/url-state/api/create-query-params) | Typed search-param group backed by signals |
| [`parseAsString`](/docs/packages/url-state/api/parse-as-string) | String parser with `.withDefault()` |
| [`parseAsInteger`](/docs/packages/url-state/api/parse-as-integer) | Integer parser — invalid values fall back |
| [`parseAsJson`](/docs/packages/url-state/api/parse-as-json) | Structured filters in the query string |
| [`Router adapter`](/docs/packages/url-state/api/adapters) | Sync reads/writes with `@echojs-ecosystem/router` |

## Common patterns

- Path segments (`:id`) stay in the **router**; filters, sort, and pagination use
  **url-state**.
- Use **`.withDefault()`** so missing params deserialize to safe UI state.
- Debounce writes in models when syncing text search to the URL.

> [!tip] Path segments and layouts stay in `@echojs-ecosystem/router`.

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/url-state/functions) | Parsers, `createQueryParams`, adapters |
| [Guides & Concepts](/docs/packages/url-state/guides/parsers) | Router sync, history |

Each API page: **Usage** → **Type Declarations** → **API** (see [createQueryParams](/docs/packages/url-state/api/create-query-params)).
