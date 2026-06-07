---
title: parseAs*
description:
  Built-in parsers, withDefault, withOptions, and custom parser factories.
package: '@echojs-ecosystem/url-state'
---

# parseAs\*

## Built-in parsers

| Export                                          | Use                            |
| ----------------------------------------------- | ------------------------------ |
| `parseAsString`                                 | string                         |
| `parseAsInteger` / `parseAsFloat`               | numbers                        |
| `parseAsBoolean`                                | boolean                        |
| `parseAsLiteral`                                | const tuple union              |
| `parseAsStringLiteral` / `parseAsNumberLiteral` | literal unions                 |
| `parseAsArrayOf(parser)`                        | array (multi-key or separator) |
| `parseAsNativeArrayOf(parser)`                  | `?k=a&k=b`                     |
| `parseAsJson(schema?)`                          | JSON + Standard Schema         |
| `parseAsIsoDate` / `parseAsTimestamp`           | date types                     |

## Parser methods

| Method                  | Description                            |
| ----------------------- | -------------------------------------- |
| `.withDefault(value)`   | Fallback when param missing or invalid |
| `.withOptions(partial)` | Default set options for this field     |

## Custom parsers

```ts
createCustomParser({ parse, serialize, eq })
createCustomMultiParser({ parse, serialize })
isMultiParser(parser) // type guard
```

## Example

```ts
import { parseAsInteger, parseAsLiteral } from '@echojs-ecosystem/url-state'

const page = parseAsInteger.withDefault(1)
const view = parseAsLiteral(['grid', 'list'] as const).withDefault('grid')
```

## See also

- [Guides: Parsers](/docs/packages/url-state/guides/parsers)
- [API: createQueryParams](/docs/packages/url-state/api/create-query-params)
