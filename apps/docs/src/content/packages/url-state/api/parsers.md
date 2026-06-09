---
title: parseAs*
description: parseAs* — Parsers API.
package: '@echojs-ecosystem/url-state'
keywords: [parseAs*, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import { parseAsInteger, parseAsLiteral } from '@echojs-ecosystem/url-state'

const page = parseAsInteger.withDefault(1)
const view = parseAsLiteral(['grid', 'list'] as const).withDefault('grid')
```

## Type Declarations

```ts
createCustomParser({ parse, serialize, eq })
createCustomMultiParser({ parse, serialize })
isMultiParser(parser) // type guard
```

## API
