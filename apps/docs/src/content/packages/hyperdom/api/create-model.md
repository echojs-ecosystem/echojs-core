---
title: createModel
description: createModel — Model & View API.
package: '@echojs-ecosystem/hyperdom'
keywords: [createModel, hyperdom]
---

@echojs-ecosystem/hyperdom

## Usage

```ts
import { createModel } from '@echojs-ecosystem/hyperdom'
import { signal } from '@echojs-ecosystem/reactivity'

export const createCounterModel = createModel((): CounterVM => {
  const $count = signal(0)
  return {
    $count,
    increment: () => $count.update((n) => n + 1),
  }
}, 'CounterModel')
```

## Type Declarations

```ts
function createModel<VM>(
  factory: () => VM,
  name: string
): (() => VM) & { displayName: string }
```

## API

### Returns

`createModel` — see Type Declarations for the full signature.
