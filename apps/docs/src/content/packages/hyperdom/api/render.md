---
title: render
description: render(view, container) — mount a view tree and return dispose.
package: '@echojs-ecosystem/hyperdom'
keywords: [render, hyperdom]
---

@echojs-ecosystem/hyperdom

## Usage

```ts
import { render } from '@echojs-ecosystem/hyperdom'

const dispose = render(appView, document.getElementById('app')!)

// on teardown:
dispose()
```

## Type Declarations

```ts
function render(view: Child, container: Element): () => void
```

## API

### Returns

`render` — see Type Declarations for the full signature.
