---
title: createComponent
description: createComponent — Model & View API.
package: '@echojs-ecosystem/hyperdom'
keywords: [createComponent, hyperdom]
---

@echojs-ecosystem/hyperdom

## Usage

```ts
type ModelFactory<VM> = () => VM
type ViewFn<VM> = (vm: VM) => Child

type CreateComponentOptions = {
  name?: string
}

function createComponent<VM>(
  model: ModelFactory<VM>,
  view: ViewFn<VM>,
  options?: CreateComponentOptions
): () => Child
```

## Type Declarations

```ts
type ModelFactory<VM> = () => VM
type ViewFn<VM> = (vm: VM) => Child

type CreateComponentOptions = {
  name?: string
}

function createComponent<VM>(
  model: ModelFactory<VM>,
  view: ViewFn<VM>,
  options?: CreateComponentOptions
): () => Child
```

## API

### Returns

`createComponent` — see Type Declarations for the full signature.
