---
title: mount
description: mount — Core API.
package: '@echojs-ecosystem/hyperdom'
keywords: [mount, hyperdom]
---

@echojs-ecosystem/hyperdom

## Usage

```ts
import { mount } from '@echojs-ecosystem/hyperdom'

const { node, dispose } = mount(counterView, {
  container: document.getElementById('app')!,
  className: 'app-root',
})
```

## Type Declarations

```ts
interface MountResult {
  node: HTMLElement
  dispose: () => void
}

function mount(
  view: Child,
  options?: { container?: HTMLElement; className?: string }
): MountResult
```

## API

### Returns

`mount` — see Type Declarations for the full signature.
