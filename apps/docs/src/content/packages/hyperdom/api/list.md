---
title: List
description: List(source, renderItem) — collection dynamic region.
package: '@echojs-ecosystem/hyperdom'
keywords: [List, hyperdom]
---

@echojs-ecosystem/hyperdom

## Usage

```ts
import { List } from '@echojs-ecosystem/hyperdom'
import { signal } from '@echojs-ecosystem/reactivity'

const $items = signal(['Todo', 'Done'])

ul(
  null,
  List($items, (label, index) => li(null, () => `${index()}: ${label}`))
)
```

## Type Declarations

```ts
function List<T>(
  source: { value(): readonly T[] } | (() => readonly T[]),
  renderItem: (item: T, index: () => number) => Child
): () => Child
```

## API

### Returns

`List` — see Type Declarations for the full signature.
