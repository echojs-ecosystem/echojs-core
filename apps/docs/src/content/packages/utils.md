---
title: Utils
description:
  Signal-native browser utilities for EchoJS — plain function names, SSR-safe,
  tree-shakeable subpath imports.
package: '@echojs-ecosystem/utils'
keywords: [windowSize, clipboard, debounce, composables]
---

:::package-overview utils

:::install @echojs-ecosystem/utils

## Quick start

```ts
import { windowSize } from '@echojs-ecosystem/utils/window-size'

const size = windowSize({ initialWidth: 0, initialHeight: 0 })
console.log(size.width(), size.height())
size.dispose()
```

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Installation](/docs/packages/utils/installation) | Package install & subpath imports |
| [Functions](/docs/packages/utils/functions) | Full index by category — links to each util page |

Each util page follows: **Usage** → **Type Declarations** → **API** (see [activeElement](/docs/packages/utils/api/active-element) for the reference layout).
