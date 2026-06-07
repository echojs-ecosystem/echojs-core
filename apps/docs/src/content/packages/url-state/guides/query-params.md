---
title: createQueryParams
description:
  Typed param groups, urlKeys, set/update/reset/clear, and single
  createQueryParam.
package: '@echojs-ecosystem/url-state'
---

# createQueryParams

`createQueryParams` creates a reactive object backed by multiple URL search
params — the primary API for filters, pagination, and view toggles.

## Param group

```ts
import {
  createQueryParams,
  parseAsBoolean,
  parseAsInteger,
  parseAsLiteral,
  parseAsString,
  parseAsArrayOf,
} from '@echojs-ecosystem/url-state'

const filters = createQueryParams({
  q: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  inStock: parseAsBoolean.withDefault(false),
  view: parseAsLiteral(['grid', 'list'] as const).withDefault('grid'),
  tag: parseAsArrayOf(parseAsString).withDefault([]),
})

filters.value()
filters.set({ q: 'bike', page: 2 })
filters.update((v) => ({ ...v, page: v.page + 1 }))
filters.reset()
filters.clear()
```

## Single param — `createQueryParam`

For one isolated param:

```ts
import { createQueryParam, parseAsInteger } from '@echojs-ecosystem/url-state'

const page = createQueryParam('page', parseAsInteger.withDefault(1))

page.value()
page.set(2, { history: 'push' })
page.update((p) => p + 1)
page.reset()
```

## `urlKeys` — rename query keys

Map schema keys to different URL key names:

```ts
const filters = createQueryParams(
  {
    inStock: parseAsBoolean.withDefault(false),
    page: parseAsInteger.withDefault(1),
  },
  {
    urlKeys: { inStock: 'stock' },
  }
)
// URL uses ?stock=true, not ?inStock=true
```

Example: workspace products page in the example app.

## Group options

```ts
createQueryParams(schema, {
  history: 'replace',
  shallow: true,
  defaultVisibility: 'show',
  urlKeys: { inStock: 'stock' },
  // limitUrlUpdates: debounce(500),
})
```

Per-call overrides: `page.set(2, { history: "push" })`.

## Instance API

| Member                   | Description                 |
| ------------------------ | --------------------------- |
| `value()`                | Parsed object of all params |
| `set(partial, options?)` | Merge and write URL         |
| `update(fn, options?)`   | Functional update           |
| `reset(options?)`        | Restore all defaults        |
| `clear(options?)`        | Remove params from URL      |

## Related

- [Parsers](/docs/packages/url-state/guides/parsers)
- [History & Sync](/docs/packages/url-state/guides/history-and-sync)
- [API: createQueryParams](/docs/packages/url-state/api/create-query-params)
