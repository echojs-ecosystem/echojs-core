---
title: createView
description: createView — Model & View API.
package: '@echojs-ecosystem/hyperdom'
keywords: [createView, hyperdom]
---

@echojs-ecosystem/hyperdom

## Usage

```ts
import { createView, button } from '@echojs-ecosystem/hyperdom'

export const CounterView = createView(
  (vm: CounterVM) =>
    button({ onClick: vm.increment }, () => String(vm.$count.value())),
  'CounterView'
)
```

## Type Declarations

```ts
function createView<VM = void>(
  viewFn: (vm: VM) => Child,
  name: string
): (vm: VM) => Child & { displayName: string }
```

## API

### Returns

`createView` — see Type Declarations for the full signature.
