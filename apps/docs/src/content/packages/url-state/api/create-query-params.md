---
title: createQueryParams
description: createQueryParam and createQueryParams — typed reactive URL state.
package: '@echojs-ecosystem/url-state'
keywords: [createQueryParams, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
function createQueryParams<
  Schema extends Record<string, ParserWithDefault<unknown>>,
>(schema: Schema, options?: CreateQueryParamsOptions): QueryParamsState<Schema>
```

## Type Declarations

```ts
function createQueryParams<
  Schema extends Record<string, ParserWithDefault<unknown>>,
>(schema: Schema, options?: CreateQueryParamsOptions): QueryParamsState<Schema>
```

## API

### Returns

`createQueryParams` — see Type Declarations for the full signature.
