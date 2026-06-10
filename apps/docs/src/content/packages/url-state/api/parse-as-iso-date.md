---
title: parseAsIsoDate
description: ISO date string ↔ `Date` parser.
package: '@echojs-ecosystem/url-state'
keywords: [parseAsIsoDate, parsers, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { parseAsIsoDate } from '@echojs-ecosystem/url-state'

const from = parseAsIsoDate.withDefault(new Date('2026-01-01'))
// ?from=2026-01-15T00:00:00.000Z
```

## Type Declarations

```ts
export const parseAsIsoDate: Parser<Date>
```

## API

### Behavior

|  |  |
| --- | --- |
| **Parse** | `new Date(v)`; rejects invalid dates |
| **Serialize** | `date.toISOString()` |

### Parser methods

| Member | Type | Description |
| --- | --- | --- |
| `.withDefault(value)` | `ParserWithDefault<Value>` | Fallback when URL missing/invalid; powers `reset()` |
| `.withOptions(opts)` | `Parser<Value>` | Per-field `history`, `defaultVisibility`, `limitUrlUpdates`, … |

### Related

- [parseAsTimestamp](/docs/packages/url-state/api/parse-as-timestamp)
- [create-query-params](/docs/packages/url-state/api/create-query-params)
