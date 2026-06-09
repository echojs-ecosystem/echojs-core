---
title: combine
description: combine — Factories API.
package: '@echojs-ecosystem/store'
keywords: [combine, store]
---

@echojs-ecosystem/store

## Usage

```ts
import { combine, createStore } from '@echojs-ecosystem/store'

const firstName = createStore('Vova')
const lastName = createStore('Ivanov')

const fullName = combine(
  { firstName, lastName },
  ({ firstName, lastName }) => `${firstName} ${lastName}`,
  { name: 'full-name' }
)
```

## Type Declarations

```ts
function combine<
  Sources extends Record<string, Store<unknown> | ReadonlyStore<unknown>>,
  Result,
>(
  sources: Sources,
  combiner: (values: SourceValues<Sources>) => Result,
  options?: CombineOptions<Result>
): ReadonlyStore<Result>
```

## API

### Returns

`combine` — see Type Declarations for the full signature.
