---
title: createStore
description: createStore(initial, options?) — create a writable reactive store.
package: '@echojs-ecosystem/store'
keywords: [createStore, store]
---

@echojs-ecosystem/store

## Usage

```ts
import { createStore } from '@echojs-ecosystem/store'

const counter = createStore(0, { name: 'counter' })
counter.set(10)
counter.update((v) => v + 1)
counter.reset()
```

## Type Declarations

```ts
function createStore<State>(
  initial: State,
  options?: StoreOptions<State>
): Store<State>
```

## API

### Returns

`createStore` — see Type Declarations for the full signature.
