---
title: Important Defaults
description: URL state behavior, adapters, and conventions for @echojs-ecosystem/url-state.
package: "@echojs-ecosystem/url-state"
---

# Important Defaults

`@echojs-ecosystem/url-state` bridges typed application state and the browser URL. These defaults shape how filters, pagination, and shareable links behave.

## Two entry points

| API | Use when |
| --- | --- |
| `createQueryParam(name, parser)` | Single search param |
| `createQueryParams(schema)` | Group of related params (filters, pagination) |

Both expose `.value()`, `.set()`, `.update()`, and `.reset()`.

## Adapter resolution

| Context | Adapter |
| --- | --- |
| EchoJS router registered | Router adapter (automatic) |
| `router.createQueryParams(...)` | Router-bound, no global import |
| Explicit `{ adapter }` option | Browser or memory adapter |
| Tests | `createMemoryUrlStateAdapter("?q=hello")` |

## Default visibility

By default, param values equal to their **parser default** are **omitted** from the URL (`defaultVisibility: "hide"`). Set `defaultVisibility: "show"` to always write defaults like `?page=1`.

## History default

Group-level default is typically `history: "replace"` for filter updates (avoid cluttering back stack). Use `history: "push"` per call for pagination steps users should undo with Back.

## Reactive reads

Call `.value()` inside HyperDOM reactive children or `effect()` — URL changes re-parse and notify subscribers when parsed values differ per parser equality.

## Naming in URLs vs schema

Schema keys (`inStock`) can differ from URL keys (`stock`) via `urlKeys` option — see [createQueryParams guide](/docs/packages/url-state/guides/query-params).

## Not in this package

| Concern | Package |
| --- | --- |
| Route path matching | `@echojs-ecosystem/router` |
| Shared app state | `@echojs-ecosystem/store` |
| Server fetch cache | `@echojs-ecosystem/query` |

## Next steps

- [Parsers](/docs/packages/url-state/guides/parsers)
- [createQueryParams](/docs/packages/url-state/guides/query-params)
- [Router Adapter](/docs/packages/url-state/guides/router-adapter)
