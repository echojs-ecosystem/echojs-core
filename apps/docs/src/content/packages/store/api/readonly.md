---
title: readonly
description: readonly — Readonly API.
package: '@echojs-ecosystem/store'
keywords: [readonly, store]
---

@echojs-ecosystem/store

## Usage

```ts
import { createStore, readonly } from '@echojs-ecosystem/store'

const counter = createStore(0)
const view = readonly(counter)

view.value()
view.subscribe((v) => {})
```

## Type Declarations

```ts
function readonly<State>(store: Store<State>): ReadonlyStore<State>
```

## API

### Returns

`readonly` — see Type Declarations for the full signature.
