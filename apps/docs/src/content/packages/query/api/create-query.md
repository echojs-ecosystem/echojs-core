---
title: createQuery
description: createQuery(options, meta?) — define a cached async resource.
package: '@echojs-ecosystem/query'
keywords: [createQuery, query]
---

@echojs-ecosystem/query

## Usage

```ts
function createQuery<TData, TParams, TError, TQueryData>(
  options: QueryOptions<TData, TParams, TError, TQueryData>,
  meta?: { provider?: QueryProvider | null }
): QueryDefinition<TData, TParams, TError>
```

## Type Declarations

```ts
function createQuery<TData, TParams, TError, TQueryData>(
  options: QueryOptions<TData, TParams, TError, TQueryData>,
  meta?: { provider?: QueryProvider | null }
): QueryDefinition<TData, TParams, TError>
```

## API

### Returns

`createQuery` — see Type Declarations for the full signature.
