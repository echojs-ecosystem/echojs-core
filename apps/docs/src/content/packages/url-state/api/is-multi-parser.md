---
title: isMultiParser
description: Type guard — `true` when `parser.parserMode === 'multi'`.
package: '@echojs-ecosystem/url-state'
keywords: [isMultiParser, parsers, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { isMultiParser, parseAsArrayOf, parseAsString } from '@echojs-ecosystem/url-state'

const tags = parseAsArrayOf(parseAsString).withDefault([])

if (isMultiParser(tags)) {
  // tags.parserMode === 'multi'
}
```

## Type Declarations

```ts
export function isMultiParser<Value>(
  parser: { parserMode?: string },
): parser is MultiParser<Value>
```

## API

### Behavior

|  |  |
| --- | --- |
| **Returns** | `true` for multi parsers (`parseAsArrayOf`, `parseAsNativeArrayOf`, `createCustomMultiParser`, …) |

### Related

- [parseAsArrayOf](/docs/packages/url-state/api/parse-as-array-of)
- [parseAsNativeArrayOf](/docs/packages/url-state/api/parse-as-native-array-of)
- [createCustomMultiParser](/docs/packages/url-state/api/create-custom-multi-parser)
