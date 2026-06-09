---
title: select
description: select — Factories API.
package: '@echojs-ecosystem/store'
keywords: [select, store]
---

@echojs-ecosystem/store

## Usage

```ts
import { createStore, select } from '@echojs-ecosystem/store'

const userStore = createStore({ id: '1', name: 'Vova' })
const userName = select(userStore, (user) => user.name, { name: 'user-name' })
```

## Type Declarations

```ts
function select<State, Selected>(
  store: Store<State> | ReadonlyStore<State>,
  selector: (state: State) => Selected,
  options?: SelectOptions<Selected>
): ReadonlyStore<Selected>
```

## API

### Returns

`select` — see Type Declarations for the full signature.
