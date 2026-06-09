---
title: h
description: h — Core API.
package: '@echojs-ecosystem/hyperdom'
keywords: [h, hyperdom]
---

@echojs-ecosystem/hyperdom

## Usage

```ts
import { h } from '@echojs-ecosystem/hyperdom'

h('button', { class: 'btn', onClick: save }, 'Save')
h('div', null, ['Hello', () => dynamicPiece()])
```

## Type Declarations

```ts
function h(
  tag: string,
  props?: Props | null,
  children?: Child,
  ...rest: Child[]
): Child
function h<P>(
  component: Component<P>,
  props?: P & { children?: Child },
  children?: Child,
  ...rest: Child[]
): Child
```

## API

### Returns

`h` — see Type Declarations for the full signature.
