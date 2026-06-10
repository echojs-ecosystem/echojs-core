---
title: createCustomParser
description: Build a single-value parser with custom parse/serialize logic.
package: '@echojs-ecosystem/url-state'
keywords: [createCustomParser, parsers, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { createCustomParser } from '@echojs-ecosystem/url-state'

const parseAsStars = createCustomParser<number>({
  parse: (raw) => {
    const v = Array.isArray(raw) ? raw[0] : raw
    if (v == null || v === '') return null
    const n = [...v].filter((c) => c === '★').length
    return n >= 1 && n <= 5 ? n : null
  },
  serialize: (n) => '★'.repeat(n),
  eq: (a, b) => a === b,
}).withDefault(3)
```

## Type Declarations

```ts
import type { SearchParamValue } from '@echojs-ecosystem/url-state'

export type CustomParserConfig<Value> = {
  parse: (value: SearchParamValue) => Value | null
  serialize: (value: Value) => SearchParamValue
  eq?: (a: Value, b: Value) => boolean
}

export function createCustomParser<Value>(
  config: CustomParserConfig<Value>,
): Parser<Value>
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `config.parse` | `(value) => Value \\| null` | — | Raw query value → typed value |
| `config.serialize` | `(value) => SearchParamValue` | — | Typed value → URL |
| `config.eq` | `(a, b) => boolean` | — | Optional; used with `defaultVisibility: 'hide'` |

### Behavior

|  |  |
| --- | --- |
| **Mode** | Sets `parserMode: 'single'` |

### Parser methods

| Member | Type | Description |
| --- | --- | --- |
| `.withDefault(value)` | `ParserWithDefault<Value>` | Fallback when URL missing/invalid; powers `reset()` |
| `.withOptions(opts)` | `Parser<Value>` | Per-field `history`, `defaultVisibility`, `limitUrlUpdates`, … |

### Related

- [createCustomMultiParser](/docs/packages/url-state/api/create-custom-multi-parser)
- [isMultiParser](/docs/packages/url-state/api/is-multi-parser)
- [Parsers guide](/docs/packages/url-state/guides/parsers)
