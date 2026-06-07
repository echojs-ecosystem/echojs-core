---
title: combine
description:
  combine(sources, combiner, options?) — merge multiple stores into one readonly
  store.
package: '@echojs-ecosystem/store'
---

# combine

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

Creates a **readonly store** from multiple source stores. Recomputes when any
source changes.

## Sources typing

`Sources` is a record of `Store` or `ReadonlyStore`. `SourceValues<Sources>`
infers value types per key for the combiner callback.

## Options

Same `name` and `equals` shape as
[createStore](/docs/packages/store/api/create-store).

## Example

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

## See also

- [Guides: Derived State](/docs/packages/store/guides/derived-state)
- [API: select](/docs/packages/store/api/select)
- [Examples: combine Full Name](/docs/packages/store/examples/combine-names)
