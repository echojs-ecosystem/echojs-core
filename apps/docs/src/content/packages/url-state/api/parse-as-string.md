---
title: parseAsString
description: Pass-through string parser for free-text query params.
package: '@echojs-ecosystem/url-state'
keywords: [parseAsString, parsers, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { parseAsString } from '@echojs-ecosystem/url-state'

const q = parseAsString.withDefault('')
// ?q=bike  →  'bike'
```

## Type Declarations

```ts
import type { Parser } from '@echojs-ecosystem/url-state'

export const parseAsString: Parser<string>
```

## API

### Behavior

|  |  |
| --- | --- |
| **Parse** | First query value as string |
| **Serialize** | Same string |
| **Example** | `?q=echo` → `'echo'` |

### Parser methods

| Member | Type | Description |
| --- | --- | --- |
| `.withDefault(value)` | `ParserWithDefault<Value>` | Fallback when URL missing/invalid; powers `reset()` |
| `.withOptions(opts)` | `Parser<Value>` | Per-field `history`, `defaultVisibility`, `limitUrlUpdates`, … |

### Related

- [parseAsInteger](/docs/packages/url-state/api/parse-as-integer)
- [create-query-params](/docs/packages/url-state/api/create-query-params)
- [Parsers guide](/docs/packages/url-state/guides/parsers)
