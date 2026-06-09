---
title: createInfiniteQuery
description: createInfiniteQuery — Factories API.
package: '@echojs-ecosystem/query'
keywords: [createInfiniteQuery, query]
---

@echojs-ecosystem/query

## Usage

```ts
function createInfiniteQuery<TData, TParams, TPageParam, TError, TQueryData>(
  options: InfiniteQueryOptions<TData, TParams, TPageParam, TError, TQueryData>,
  meta?: { provider?: QueryProvider | null }
): InfiniteQueryDefinition<TData, TParams, TPageParam, TError>
```

## Type Declarations

```ts
function createInfiniteQuery<TData, TParams, TPageParam, TError, TQueryData>(
  options: InfiniteQueryOptions<TData, TParams, TPageParam, TError, TQueryData>,
  meta?: { provider?: QueryProvider | null }
): InfiniteQueryDefinition<TData, TParams, TPageParam, TError>
```

## API

### Returns

`createInfiniteQuery` — see Type Declarations for the full signature.
