---
title: Window Size
description: Track viewport dimensions with windowSize.
package: '@echojs-ecosystem/utils'
---

# Window Size

```ts
import { windowSize } from '@echojs-ecosystem/utils/window-size'

const size = windowSize({
  initialWidth: 0,
  initialHeight: 0,
})

// In a view or effect:
size.width()
size.height()

// Bind to HyperDOM via signal:
size.$width

size.dispose()
```

SSR: pass `initialWidth` / `initialHeight` — no `resize` listener on the server.
