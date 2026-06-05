---
title: API Reference
description: Public exports from @echojs/url-state.
package: "@echojs/url-state"
---

# API Reference

## Factories

| Export | Description |
| --- | --- |
| `createQueryParam(name, parser, options?)` | Single search param state |
| `createQueryParams(schema, options?)` | Object of params |

## Parsers

| Export | Description |
| --- | --- |
| `parseAsString` | string |
| `parseAsInteger` / `parseAsFloat` | numbers |
| `parseAsBoolean` | boolean |
| `parseAsLiteral` | const tuple union |
| `parseAsStringLiteral` / `parseAsNumberLiteral` | literal unions |
| `parseAsArrayOf(parser)` | array (multi-key or separator) |
| `parseAsNativeArrayOf(parser)` | `?k=a&k=b` |
| `parseAsJson(schema?)` | JSON + Standard Schema |
| `parseAsIsoDate` / `parseAsTimestamp` | date types |
| `createCustomParser(config)` | Custom single parser |
| `createCustomMultiParser(config)` | Repeated keys |
| `isMultiParser(parser)` | Type guard |

Parser methods: `.withDefault(value)`, `.withOptions(partial)`.

## Adapters

| Export | Description |
| --- | --- |
| `createBrowserUrlStateAdapter()` | `window` history |
| `createMemoryUrlStateAdapter(initialSearch?)` | Tests |
| `createRouterUrlStateAdapter(router)` | Router-backed |
| `attachRouterQueryParams(router)` | Adds `router.createQueryParams` |
| `getUrlStateRouter()` | Registered router |

## Utilities

| Export | Description |
| --- | --- |
| `debounce(ms)` | Limit URL update rate |
| `throttle(ms)` | Throttle URL updates |

## `QueryParamState` / group (typical)

| Member | Description |
| --- | --- |
| `value()` | Parsed value(s) |
| `set(value, options?)` | Write URL |
| `update(fn, options?)` | Functional update |
| `reset(options?)` | Defaults |
| `clear(options?)` | Remove from URL (group) |

## `QueryStateSetOptions`

| Field | Type |
| --- | --- |
| `adapter` | `UrlStateAdapter` |
| `history` | `"push"` \| `"replace"` |
| `shallow` | `boolean` |
| `scroll` | `boolean` |
| `defaultVisibility` | `"hide"` \| `"show"` |
| `limitUrlUpdates` | debounce/throttle/false |
| `equals` | custom equality |

## `CreateQueryParamsOptions`

Extends set options with:

| Field | Description |
| --- | --- |
| `urlKeys` | Map schema key → URL key name |

## Types

`Parser`, `ParserWithDefault`, `MultiParser`, `QueryParamParser`, `QueryParamState`, `QueryParamsState`, `UrlStateAdapter`, `QueryStateOptions`, `DefaultVisibility`, `RouterBoundQueryParams`, `RouterWithQueryParams`, `CustomParserConfig`, `CustomMultiParserConfig`, `JsonSchema`, `StandardSchemaLike`, …

## Related

- Usage — `/docs/packages/url-state/usage`
- Overview — `/docs/packages/url-state`
