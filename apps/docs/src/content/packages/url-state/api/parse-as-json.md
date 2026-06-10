---
title: parseAsJson
description: JSON object in a single query key with optional Standard Schema validation.
package: '@echojs-ecosystem/url-state'
keywords: [parseAsJson, parsers, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { parseAsJson } from '@echojs-ecosystem/url-state'
import { z } from 'zod'

const layout = parseAsJson(
  z.object({ cols: z.number().int().min(1).max(4), collapsed: z.boolean() }),
).withDefault({ cols: 3, collapsed: false })
```

## Type Declarations

```ts
export function parseAsJson<T = unknown>(schema?: JsonSchema<T>): Parser<T>
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `schema` | `JsonSchema<T>` | — | Optional Zod / Valibot / Standard Schema validator |

### Behavior

|  |  |
| --- | --- |
| **Parse** | `JSON.parse` + optional schema validation |
| **Serialize** | `JSON.stringify` |
| **On error** | `null` (invalid JSON or schema) |

### Parser methods

| Member | Type | Description |
| --- | --- | --- |
| `.withDefault(value)` | `ParserWithDefault<Value>` | Fallback when URL missing/invalid; powers `reset()` |
| `.withOptions(opts)` | `Parser<Value>` | Per-field `history`, `defaultVisibility`, `limitUrlUpdates`, … |

### Related

- [create-query-params](/docs/packages/url-state/api/create-query-params)
- [Parsers guide](/docs/packages/url-state/guides/parsers)
