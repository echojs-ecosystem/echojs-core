---
title: SSR-Safe Defaults
description: How browser utilities behave without window or document.
package: '@echojs-ecosystem/utils'
---

# SSR-Safe Defaults

Browser utilities check the environment before touching DOM APIs.

## Helpers

```ts
import { isClient, isServer, defaultWindow } from '@echojs-ecosystem/utils'
```

| Helper | Server | Client |
| ------ | ------ | ------ |
| `isClient` | `false` | `true` |
| `isServer` | `true` | `false` |
| `defaultWindow` | `undefined` | `window` |

## Pattern

On the server:

- No `addEventListener`, `matchMedia`, or `ResizeObserver` registration
- Safe **initial** values from options (e.g. `initialWidth: 0`)

```ts
const size = windowSize({
  initialWidth: 0,
  initialHeight: 0,
})
```

After hydration on the client, create or re-create composables that need live
browser state, or rely on utilities that read dimensions on first client run.

## Clipboard & permissions

`clipboard().copy()` throws a clear error when `navigator.clipboard` is
unavailable (typical on the server).
