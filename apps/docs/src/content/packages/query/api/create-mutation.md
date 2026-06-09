---
title: createMutation
description: createMutation — Factories API.
package: '@echojs-ecosystem/query'
keywords: [createMutation, query]
---

@echojs-ecosystem/query

## Usage

```ts
function createMutation<TData, TVariables, TError, TContext>(
  options: MutationOptions<TData, TVariables, TError, TContext>,
  meta?: { provider?: QueryProvider | null }
): MutationDefinition<TData, TVariables, TError, TContext>
```

## Type Declarations

```ts
function createMutation<TData, TVariables, TError, TContext>(
  options: MutationOptions<TData, TVariables, TError, TContext>,
  meta?: { provider?: QueryProvider | null }
): MutationDefinition<TData, TVariables, TError, TContext>
```

## API

### Returns

`createMutation` — see Type Declarations for the full signature.
