---
title: Query
description: Parse and stringify URL search params (arrays as repeated keys).
package: '@echojs-ecosystem/router'
keywords: [parseQuery, stringifyQuery, router]
---

@echojs-ecosystem/router

## Usage

```ts
import { parseQuery, stringifyQuery } from '@echojs-ecosystem/router'

const q = parseQuery('?tag=a&tag=b')
stringifyQuery({ tag: ['a', 'b'] })
```

## Type Declarations

```ts
export const parseQuery: (search: string) => Record<string, string | string[]>
export const stringifyQuery: (query: Record<string, unknown>) => string
export const parseQueryValues: (search: string) => Record<string, unknown>
```

## API

### Returns

`Query` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| `parseQuery` | record | Query object from `?…` string |
| `stringifyQuery` | string | Build search string |

### Related

- [Path](/docs/packages/router/api/path)
- [createRouteView](/docs/packages/router/api/create-route-view)
