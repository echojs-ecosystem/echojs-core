---
title: Types
description: Exported TypeScript types for parsers, adapters, and param state.
package: "@echojs-ecosystem/url-state"
---

# Types

## Parser types

| Type | Description |
| --- | --- |
| `Parser<T>` | Single-value parser |
| `ParserWithDefault<T>` | Parser with default value |
| `MultiParser<T>` | Multi-key parser |
| `QueryParamParser<T>` | Union of parser shapes |
| `CustomParserConfig<T>` | Config for `createCustomParser` |
| `CustomMultiParserConfig<T>` | Config for `createCustomMultiParser` |
| `JsonSchema` / `StandardSchemaLike` | JSON parser validation |

## State types

| Type | Description |
| --- | --- |
| `QueryParamState<T>` | Single param instance |
| `QueryParamsState<Schema>` | Param group instance |
| `QueryStateOptions` | Options for single param |
| `CreateQueryParamsOptions` | Options for param group |
| `QueryStateSetOptions` | Per-write options |
| `DefaultVisibility` | `"hide"` \| `"show"` |

## Adapter types

| Type | Description |
| --- | --- |
| `UrlStateAdapter` | Read/write search string |
| `RouterBoundQueryParams` | Router-scoped param group |
| `RouterWithQueryParams` | Router with `createQueryParams` |

## See also

- [API: parseAs*](/docs/packages/url-state/api/parsers)
- [API: createQueryParams](/docs/packages/url-state/api/create-query-params)
