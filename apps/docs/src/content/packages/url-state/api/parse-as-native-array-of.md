---
title: parseAsNativeArrayOf
description: Array parser for repeated keys only (`?id=1&id=2`).
package: '@echojs-ecosystem/url-state'
keywords: [parseAsNativeArrayOf, parsers, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { parseAsInteger, parseAsNativeArrayOf } from '@echojs-ecosystem/url-state'

const ids = parseAsNativeArrayOf(parseAsInteger).withDefault([])
```

## Type Declarations

```ts
export function parseAsNativeArrayOf<Item>(item: Parser<Item>): MultiParser<Item[]>
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `item` | `Parser<Item>` | — | Parser for each repeated value |

### Behavior

|  |  |
| --- | --- |
| **Parse** | One string per repeated key only |
| **Serialize** | One string per array item |
| **Typical use** | Chained with `.withDefault([])` |

### Parser methods

| Member | Type | Description |
| --- | --- | --- |
| `.withDefault(value)` | `ParserWithDefault<Value>` | Fallback when URL missing/invalid; powers `reset()` |
| `.withOptions(opts)` | `Parser<Value>` | Per-field `history`, `defaultVisibility`, `limitUrlUpdates`, … |

### Related

- [parseAsArrayOf](/docs/packages/url-state/api/parse-as-array-of)
- [isMultiParser](/docs/packages/url-state/api/is-multi-parser)
- [create-query-params](/docs/packages/url-state/api/create-query-params)
