---
title: parseAsFloat
description: Finite number parser via `Number(value)`.
package: '@echojs-ecosystem/url-state'
keywords: [parseAsFloat, parsers, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { parseAsFloat } from '@echojs-ecosystem/url-state'

const price = parseAsFloat.withDefault(0)
// ?price=9.99  →  9.99
```

## Type Declarations

```ts
export const parseAsFloat: Parser<number>
```

## API

### Behavior

|  |  |
| --- | --- |
| **Parse** | `Number(value)`; must be finite |
| **Serialize** | `String(n)` |
| **Example** | `?p=9.99` → `9.99` |

### Parser methods

| Member | Type | Description |
| --- | --- | --- |
| `.withDefault(value)` | `ParserWithDefault<Value>` | Fallback when URL missing/invalid; powers `reset()` |
| `.withOptions(opts)` | `Parser<Value>` | Per-field `history`, `defaultVisibility`, `limitUrlUpdates`, … |

### Related

- [parseAsInteger](/docs/packages/url-state/api/parse-as-integer)
- [create-query-params](/docs/packages/url-state/api/create-query-params)
