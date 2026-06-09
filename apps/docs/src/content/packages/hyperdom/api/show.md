---
title: Show
description: Show(condition, then, else?) — conditional dynamic region.
package: '@echojs-ecosystem/hyperdom'
keywords: [Show, hyperdom]
---

@echojs-ecosystem/hyperdom

## Usage

```ts
import { Show } from '@echojs-ecosystem/hyperdom'

Show(
  () => $loggedIn.value(),
  () => dashboard(),
  () => loginForm()
)
```

## Type Declarations

```ts
function Show(
  condition: () => boolean,
  then: () => Child,
  fallback?: () => Child
): () => Child
```

## API

### Returns

`Show` — see Type Declarations for the full signature.
