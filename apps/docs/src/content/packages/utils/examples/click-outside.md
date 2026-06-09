---
title: Click Outside
description: Detect clicks outside an element with clickOutside.
package: '@echojs-ecosystem/utils'
---

# Click Outside

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { clickOutside } from '@echojs-ecosystem/utils/click-outside'

const panel = signal<HTMLElement | null>(null)

const clickOutside = clickOutside(panel, () => {
  closeMenu()
})

clickOutside.dispose()
```

Uses capture-phase `mousedown` / `touchstart` on `document`.
