---
title: parseAsLiteral
description: Enum parser — value must be in an allowed set.
package: '@echojs-ecosystem/url-state'
keywords: [parseAsLiteral, parsers, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { parseAsLiteral, parseAsNumberLiteral, parseAsStringLiteral } from '@echojs-ecosystem/url-state'

const sort = parseAsLiteral(['relevance', 'price_asc', 'price_desc'] as const).withDefault('relevance')
const view = parseAsStringLiteral(['grid', 'list'] as const).withDefault('grid')
const size = parseAsNumberLiteral([1, 2, 3] as const).withDefault(1)
```

## Type Declarations

```ts
export function parseAsLiteral<const Values extends readonly (string | number)[]>(
  values: Values,
): Parser<Values[number]>

export const parseAsStringLiteral: typeof parseAsLiteral
export const parseAsNumberLiteral: typeof parseAsLiteral
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `values` | `readonly (string \\| number)[]` | — | Allowed values; use `as const` for union typing |

### Behavior

|  |  |
| --- | --- |
| **Parse** | Value must be in the allowed set |
| **Serialize** | `String(value)` |
| **Typing** | `as const` array preserves union |

### Parser methods

| Member | Type | Description |
| --- | --- | --- |
| `.withDefault(value)` | `ParserWithDefault<Value>` | Fallback when URL missing/invalid; powers `reset()` |
| `.withOptions(opts)` | `Parser<Value>` | Per-field `history`, `defaultVisibility`, `limitUrlUpdates`, … |

### Related

- [parseAsString](/docs/packages/url-state/api/parse-as-string)
- [create-query-params](/docs/packages/url-state/api/create-query-params)
- [Parsers guide](/docs/packages/url-state/guides/parsers)
