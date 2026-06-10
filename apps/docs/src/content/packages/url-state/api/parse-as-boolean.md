---
title: parseAsBoolean
description: Boolean parser for toggle filters.
package: '@echojs-ecosystem/url-state'
keywords: [parseAsBoolean, parsers, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { parseAsBoolean } from '@echojs-ecosystem/url-state'

const inStock = parseAsBoolean.withDefault(false)
// ?inStock=true  →  true
// ?inStock=1     →  true
```

## Type Declarations

```ts
export const parseAsBoolean: Parser<boolean>
```

## API

### Behavior

|  |  |
| --- | --- |
| **Parse** | `true` / `false` / `1` / `0` (case-insensitive) |
| **Serialize** | `'true'` or `'false'` |

### Parser methods

| Member | Type | Description |
| --- | --- | --- |
| `.withDefault(value)` | `ParserWithDefault<Value>` | Fallback when URL missing/invalid; powers `reset()` |
| `.withOptions(opts)` | `Parser<Value>` | Per-field `history`, `defaultVisibility`, `limitUrlUpdates`, … |

### Related

- [create-query-params](/docs/packages/url-state/api/create-query-params)
- [Parsers guide](/docs/packages/url-state/guides/parsers)
