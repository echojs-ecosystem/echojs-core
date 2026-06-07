---
title: combine Full Name
description:
  Merge first and last name stores into a derived fullName readonly store.
package: '@echojs-ecosystem/store'
---

# combine Full Name

`combine` merges multiple source stores into one readonly derived store — ideal
when a display value depends on several independent pieces of state.

## Problem

Show a full name that updates when either the first or last name store changes.

## Stores

```ts
import { combine, createStore } from '@echojs-ecosystem/store'

const first = createStore('Echo')
const last = createStore('JS')

const fullName = combine(
  { first, last },
  ({ first, last }) => `${first} ${last}`,
  { name: 'full-name' }
)

fullName.value() // "Echo JS"
```

## Updating sources

Mutate the **source** stores, not `fullName`:

```ts
first.set('EchoJS')
fullName.value() // "EchoJS JS"
```

## In a view

```ts
span(null, () => fullName.value())
```

## See also

- [Guides: Derived State](/docs/packages/store/guides/derived-state)
- [API: combine](/docs/packages/store/api/combine)
