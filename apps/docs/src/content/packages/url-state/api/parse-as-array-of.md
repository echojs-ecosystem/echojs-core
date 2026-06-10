---
title: parseAsArrayOf
description: Array parser — repeated keys or a single joined value.
package: '@echojs-ecosystem/url-state'
keywords: [parseAsArrayOf, parsers, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { parseAsArrayOf, parseAsString } from '@echojs-ecosystem/url-state'

// ?tag=a&tag=b  OR  ?tag=a,b,c
const tags = parseAsArrayOf(parseAsString, ',').withDefault([])
```

## Type Declarations

```ts
export function parseAsArrayOf<Item>(
  item: Parser<Item>,
  separator?: string,
): MultiParser<Item[]>
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `item` | `Parser<Item>` | — | Parser for each array element |
| `separator` | `string` | — | When set, one key split by separator; otherwise repeated keys |

### Behavior

|  |  |
| --- | --- |
| **No separator** | `?tag=a&tag=b` (repeated keys) |
| **With separator** | `?tag=a,b,c` (single key, split) |
| **On failure** | Returns `null` if any item fails `item.parse` |
| **Equality** | Built-in `eq` compares lengths and `Object.is` per index |

### Parser methods

| Member | Type | Description |
| --- | --- | --- |
| `.withDefault(value)` | `ParserWithDefault<Value>` | Fallback when URL missing/invalid; powers `reset()` |
| `.withOptions(opts)` | `Parser<Value>` | Per-field `history`, `defaultVisibility`, `limitUrlUpdates`, … |

### Related

- [parseAsNativeArrayOf](/docs/packages/url-state/api/parse-as-native-array-of)
- [isMultiParser](/docs/packages/url-state/api/is-multi-parser)
- [create-query-params](/docs/packages/url-state/api/create-query-params)
