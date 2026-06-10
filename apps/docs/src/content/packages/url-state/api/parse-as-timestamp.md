---
title: parseAsTimestamp
description: Unix timestamp (ms) as numeric string.
package: '@echojs-ecosystem/url-state'
keywords: [parseAsTimestamp, parsers, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { parseAsTimestamp } from '@echojs-ecosystem/url-state'

const t = parseAsTimestamp.withDefault(Date.now())
// ?t=1700000000000
```

## Type Declarations

```ts
export const parseAsTimestamp: Parser<number>
```

## API

### Behavior

|  |  |
| --- | --- |
| **Parse** | Numeric string → Unix timestamp (ms) |
| **Serialize** | `String(timestamp)` |

### Parser methods

| Member | Type | Description |
| --- | --- | --- |
| `.withDefault(value)` | `ParserWithDefault<Value>` | Fallback when URL missing/invalid; powers `reset()` |
| `.withOptions(opts)` | `Parser<Value>` | Per-field `history`, `defaultVisibility`, `limitUrlUpdates`, … |

### Related

- [parseAsIsoDate](/docs/packages/url-state/api/parse-as-iso-date)
- [create-query-params](/docs/packages/url-state/api/create-query-params)
