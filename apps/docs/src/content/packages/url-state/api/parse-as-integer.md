---
title: parseAsInteger
description: Integer parser — rejects floats and non-numeric strings.
package: '@echojs-ecosystem/url-state'
keywords: [parseAsInteger, parsers, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { parseAsInteger } from '@echojs-ecosystem/url-state'

const page = parseAsInteger.withDefault(1)
// ?page=2  →  2
// ?page=abc  →  null  →  default 1
```

## Type Declarations

```ts
export const parseAsInteger: Parser<number>
```

## API

### Behavior

|  |  |
| --- | --- |
| **Parse** | Matches `/^[+-]?\d+$/`; `parseInt` base 10 |
| **Serialize** | `String(Math.trunc(n))` |
| **Rejects** | `1.5`, `abc`, empty |

### Parser methods

| Member | Type | Description |
| --- | --- | --- |
| `.withDefault(value)` | `ParserWithDefault<Value>` | Fallback when URL missing/invalid; powers `reset()` |
| `.withOptions(opts)` | `Parser<Value>` | Per-field `history`, `defaultVisibility`, `limitUrlUpdates`, … |

### Related

- [parseAsFloat](/docs/packages/url-state/api/parse-as-float)
- [parseAsString](/docs/packages/url-state/api/parse-as-string)
- [create-query-params](/docs/packages/url-state/api/create-query-params)
