---
title: Subpath Imports
description: Tree-shakeable per-util entry points for @echojs-ecosystem/utils.
package: '@echojs-ecosystem/utils'
---

# Subpath Imports

`package.json` exports one entry per utility so bundlers pull only what you
import.

## Examples

```ts
import { windowSize } from '@echojs-ecosystem/utils/window-size'
import { mediaQuery } from '@echojs-ecosystem/utils/media-query'
import { debounce, debounceFn } from '@echojs-ecosystem/utils/debounce'
import { clickOutside } from '@echojs-ecosystem/utils/click-outside'
```

## Full barrel

```ts
import { windowSize, clipboard } from '@echojs-ecosystem/utils'
```

Convenient for prototypes; prefer subpaths in production UI chunks.

## `sideEffects: false`

The package is marked side-effect free — unused utilities are dropped when
imports are static and subpath-scoped.
