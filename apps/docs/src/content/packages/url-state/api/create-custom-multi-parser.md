---
title: createCustomMultiParser
description: Build a multi-value parser for repeated query keys.
package: '@echojs-ecosystem/url-state'
keywords: [createCustomMultiParser, parsers, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { createCustomMultiParser } from '@echojs-ecosystem/url-state'

const parseAsSortedIds = createCustomMultiParser<number[]>({
  parse: (values) => {
    const nums = values.map((v) => Number(v))
    if (nums.some((n) => !Number.isFinite(n))) return null
    return nums
  },
  serialize: (ids) => ids.map(String),
  eq: (a, b) => a.length === b.length && a.every((v, i) => v === b[i]),
}).withDefault([])
```

## Type Declarations

```ts
export type CustomMultiParserConfig<Value> = {
  parse: (values: string[]) => Value | null
  serialize: (value: Value) => string[]
  eq?: (a: Value, b: Value) => boolean
}

export function createCustomMultiParser<Value>(
  config: CustomMultiParserConfig<Value>,
): MultiParser<Value>
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `config.parse` | `(values: string[]) => Value \\| null` | — | All repeated values |
| `config.serialize` | `(value) => string[]` | — | Back to repeated keys |
| `config.eq` | `(a, b) => boolean` | — | Optional array/object equality |

### Behavior

|  |  |
| --- | --- |
| **Mode** | Sets `parserMode: 'multi'` |

### Parser methods

| Member | Type | Description |
| --- | --- | --- |
| `.withDefault(value)` | `ParserWithDefault<Value>` | Fallback when URL missing/invalid; powers `reset()` |
| `.withOptions(opts)` | `Parser<Value>` | Per-field `history`, `defaultVisibility`, `limitUrlUpdates`, … |

### Related

- [createCustomParser](/docs/packages/url-state/api/create-custom-parser)
- [isMultiParser](/docs/packages/url-state/api/is-multi-parser)
- [parseAsArrayOf](/docs/packages/url-state/api/parse-as-array-of)
