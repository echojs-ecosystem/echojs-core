---
title: Parsers
description:
  Typed parse/serialize pairs for query params — built-ins, defaults, arrays,
  JSON, and custom parsers.
package: '@echojs-ecosystem/url-state'
---

# Parsers

Every URL query param in `@echojs-ecosystem/url-state` flows through a
**parser**: `parse` turns the raw string (or repeated keys) into a typed value;
`serialize` writes it back. Parsers plug into
[`createQueryParams`](/docs/packages/url-state/guides/query-params) and
[`createQueryParam`](/docs/packages/url-state/api/create-query-params).

```ts
import { parseAsInteger } from '@echojs-ecosystem/url-state'

// ?page=2  →  2
// missing or invalid  →  null (then default if .withDefault was chained)
const page = parseAsInteger.withDefault(1)
```

> [!TIP] Parsers are **not** React hooks — they are plain objects you pass into
> factories. Reactive reads happen on `createQueryParams().value()`, not on the
> parser itself.

## Mental model

| Piece | Role |
| ----- | ---- |
| `parse(raw)` | `string \| string[] \| null` → `Value \| null` |
| `serialize(value)` | `Value` → `string \| string[] \| null` |
| `.withDefault(v)` | Invalid/missing URL → use `v`; enables `reset()` |
| `.withOptions({...})` | Per-field `history`, `defaultVisibility`, throttle, … |
| `eq(a, b)` | Custom equality for `defaultVisibility: 'hide'` |

**Single parsers** (`parserMode: 'single'`) — one query key, one value:
`?page=2`.

**Multi parsers** (`parserMode: 'multi'`) — repeated keys or joined arrays:
`?tag=a&tag=b` or `?tag=a,b`.

Use [`isMultiParser`](/docs/packages/url-state/api/is-multi-parser) when branching on
parser shape.

## Built-in parsers

### Scalars

| Parser | Type | URL examples | API |
| ------ | ---- | ------------ | --- |
| `parseAsString` | `string` | `?q=bike` | [parseAsString](/docs/packages/url-state/api/parse-as-string) |
| `parseAsInteger` | `number` | `?page=2` | [parseAsInteger](/docs/packages/url-state/api/parse-as-integer) |
| `parseAsFloat` | `number` | `?price=9.99` | [parseAsFloat](/docs/packages/url-state/api/parse-as-float) |
| `parseAsBoolean` | `boolean` | `?inStock=true` | [parseAsBoolean](/docs/packages/url-state/api/parse-as-boolean) |
| `parseAsIsoDate` | `Date` | `?from=2026-01-15T00:00:00.000Z` | [parseAsIsoDate](/docs/packages/url-state/api/parse-as-iso-date) |
| `parseAsTimestamp` | `number` | `?t=1700000000000` | [parseAsTimestamp](/docs/packages/url-state/api/parse-as-timestamp) |

```ts
import {
  parseAsBoolean,
  parseAsFloat,
  parseAsInteger,
  parseAsIsoDate,
  parseAsString,
} from '@echojs-ecosystem/url-state'

const filters = {
  q: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  price: parseAsFloat.withDefault(0),
  inStock: parseAsBoolean.withDefault(false),
  from: parseAsIsoDate.withDefault(new Date('2026-01-01')),
}
```

### Literals (enums)

Restrict a param to a fixed set — invalid values become `null` (then default):

```ts
import { parseAsLiteral, parseAsStringLiteral } from '@echojs-ecosystem/url-state'

const sort = parseAsLiteral([
  'relevance',
  'price_asc',
  'price_desc',
  'name',
] as const).withDefault('relevance')

const view = parseAsStringLiteral(['grid', 'list'] as const).withDefault('grid')
```

`parseAsNumberLiteral([1, 2, 3] as const)` is the same helper for numeric unions.

### Arrays — choose the right helper

| Parser | Serialized as | When to use |
| ------ | ------------- | ----------- |
| `parseAsArrayOf(item)` | Repeated keys **or** one key with separator | `?tag=a&tag=b` or `?tag=a,b` |
| `parseAsNativeArrayOf(item)` | Repeated keys only | Strict `?tag=a&tag=b` |

```ts
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsNativeArrayOf,
  parseAsString,
} from '@echojs-ecosystem/url-state'

// Repeated keys OR comma-separated in one key
const tags = parseAsArrayOf(parseAsString, ',').withDefault([])

// Native repeated keys only (?id=1&id=2)
const ids = parseAsNativeArrayOf(parseAsInteger).withDefault([])
```

> [!WARNING] If any item fails to parse, the **whole array** returns `null` and
> the field falls back to its default. Keep item parsers strict.

### JSON + Standard Schema

Encode structured state in a single key — optional Zod / Valibot / Standard
Schema validation on parse:

```ts
import { parseAsJson } from '@echojs-ecosystem/url-state'
import { z } from 'zod'

const layoutSchema = z.object({
  cols: z.number().int().min(1).max(4),
  collapsed: z.boolean(),
})

const layout = parseAsJson(layoutSchema).withDefault({
  cols: 3,
  collapsed: false,
})

// ?layout={"cols":2,"collapsed":true}
```

Invalid JSON or schema failure → `null` → default.

## Defaults and invalid URLs

Chain `.withDefault(value)` so missing or invalid query strings resolve safely:

```ts
parseAsInteger.withDefault(1)
```

| URL | `parseAsInteger` | With default `1` |
| --- | ---------------- | ---------------- |
| absent | `null` | `1` |
| `?page=abc` | `null` | `1` |
| `?page=3` | `3` | `3` |

`reset()` on a param group restores **parser defaults**, not `null`.

Per-parser options (merged with group options):

```ts
parseAsInteger
  .withDefault(1)
  .withOptions({ history: 'replace', defaultVisibility: 'hide' })
```

See [Important Defaults](/docs/packages/url-state/guides/important-defaults) for
`defaultVisibility: 'hide' | 'show'`.

## Custom single parser

```ts
import { createCustomParser } from '@echojs-ecosystem/url-state'

/** 1–5 star rating in the URL as "★★★" */
export const parseAsStars = createCustomParser<number>({
  parse: (raw) => {
    const v = Array.isArray(raw) ? raw[0] : raw
    if (v == null || v === '') return null
    const n = [...v].filter((c) => c === '★').length
    return n >= 1 && n <= 5 ? n : null
  },
  serialize: (n) => '★'.repeat(n),
  eq: (a, b) => a === b,
}).withDefault(3)
```

`eq` matters when `defaultVisibility: 'hide'` compares current value to default
(objects, arrays, custom types).

## Custom multi parser

```ts
import { createCustomMultiParser } from '@echojs-ecosystem/url-state'

const parseAsSortedIds = createCustomMultiParser<number[]>({
  parse: (values) => {
    const nums = values.map((v) => Number(v))
    if (nums.some((n) => !Number.isFinite(n))) return null
    return nums
  },
  serialize: (ids) => ids.map(String),
  eq: (a, b) => a.length === b.length && a.every((v, i) => v === b[i]),
}).withDefault([])
```

## Full filter schema

Real pattern from [Catalog Filters](/docs/packages/url-state/examples/catalog-filters):

```ts
import {
  createQueryParams,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsLiteral,
  parseAsString,
} from '@echojs-ecosystem/url-state'

export const productsQueryParams = createQueryParams(
  {
    q: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    inStock: parseAsBoolean.withDefault(false),
    sort: parseAsLiteral([
      'relevance',
      'price_asc',
      'price_desc',
      'name',
    ] as const).withDefault('relevance'),
    view: parseAsLiteral(['grid', 'list'] as const).withDefault('grid'),
    tag: parseAsArrayOf(parseAsString).withDefault([]),
  },
  {
    defaultVisibility: 'show',
    history: 'replace',
    urlKeys: { inStock: 'stock' },
  }
)
```

## Choosing a parser

| You have | Use |
| -------- | --- |
| Free text search | `parseAsString` |
| Page number | `parseAsInteger` |
| Price, ratio | `parseAsFloat` |
| Toggle filter | `parseAsBoolean` |
| Tab / sort / view mode | `parseAsLiteral` |
| Multi-select tags | `parseAsNativeArrayOf(parseAsString)` |
| CSV in one key | `parseAsArrayOf(parseAsString, ',')` |
| Small JSON blob | `parseAsJson(schema)` |
| Custom encoding | `createCustomParser` / `createCustomMultiParser` |

## API reference

[parseAsString](/docs/packages/url-state/api/parse-as-string) ·
[parseAsInteger](/docs/packages/url-state/api/parse-as-integer) ·
[parseAsFloat](/docs/packages/url-state/api/parse-as-float) ·
[parseAsBoolean](/docs/packages/url-state/api/parse-as-boolean) ·
[parseAsIsoDate](/docs/packages/url-state/api/parse-as-iso-date) ·
[parseAsTimestamp](/docs/packages/url-state/api/parse-as-timestamp) ·
[parseAsLiteral](/docs/packages/url-state/api/parse-as-literal) ·
[parseAsArrayOf](/docs/packages/url-state/api/parse-as-array-of) ·
[parseAsNativeArrayOf](/docs/packages/url-state/api/parse-as-native-array-of) ·
[parseAsJson](/docs/packages/url-state/api/parse-as-json) ·
[createCustomParser](/docs/packages/url-state/api/create-custom-parser) ·
[createCustomMultiParser](/docs/packages/url-state/api/create-custom-multi-parser) ·
[isMultiParser](/docs/packages/url-state/api/is-multi-parser)

## Related

- [createQueryParams](/docs/packages/url-state/guides/query-params)
- [Important Defaults](/docs/packages/url-state/guides/important-defaults)
- [History & Sync](/docs/packages/url-state/guides/history-and-sync)
- [Catalog Filters](/docs/packages/url-state/examples/catalog-filters)
