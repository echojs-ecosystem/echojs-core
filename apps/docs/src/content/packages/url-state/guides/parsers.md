---
title: Parsers
description:
  parseAs* built-ins, withDefault, custom parsers, and serialization rules.
package: '@echojs-ecosystem/url-state'
---

# Parsers

Parsers define how a query param string maps to a typed value and back. Every
param or schema field uses a parser.

## Built-in parsers

| Parser                                          | Use                                   |
| ----------------------------------------------- | ------------------------------------- |
| `parseAsString`                                 | string                                |
| `parseAsInteger` / `parseAsFloat`               | numbers                               |
| `parseAsBoolean`                                | boolean                               |
| `parseAsLiteral([...])`                         | union of literals                     |
| `parseAsStringLiteral` / `parseAsNumberLiteral` | typed literals                        |
| `parseAsArrayOf(parser)`                        | repeated keys or separator            |
| `parseAsNativeArrayOf(parser)`                  | `?tag=a&tag=b` only                   |
| `parseAsJson(schema?)`                          | JSON + optional Standard Schema (Zod) |
| `parseAsIsoDate` / `parseAsTimestamp`           | dates                                 |

## Defaults and options

Chain `.withDefault(value)` and `.withOptions(partial)` on any parser:

```ts
parseAsInteger.withDefault(1).withOptions({ history: 'replace' })
```

Invalid URL values fall back to the default when parsing fails.

## Example schema

```ts
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsLiteral,
  parseAsString,
  parseAsArrayOf,
} from '@echojs-ecosystem/url-state'

const parsers = {
  q: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  inStock: parseAsBoolean.withDefault(false),
  view: parseAsLiteral(['grid', 'list'] as const).withDefault('grid'),
  tag: parseAsArrayOf(parseAsString).withDefault([]),
}
```

## Custom parsers

```ts
import {
  createCustomParser,
  createCustomMultiParser,
} from '@echojs-ecosystem/url-state'

const parseAsStars = createCustomParser({
  parse: (value) => {
    /* string | string[] | null → number */
  },
  serialize: (value) => '★'.repeat(value),
  eq: (a, b) => a === b,
})

const parseAsIds = createCustomMultiParser({
  parse: (values) => values.map(Number),
  serialize: (ids) => ids.map(String),
})
```

Use `isMultiParser(parser)` as a type guard for multi-key parsers.

## Related

- [createQueryParams](/docs/packages/url-state/guides/query-params)
- [API: parseAs\*](/docs/packages/url-state/api/parsers)
- [Examples: Catalog Filters](/docs/packages/url-state/examples/catalog-filters)
