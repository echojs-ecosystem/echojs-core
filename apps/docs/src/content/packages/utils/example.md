---
title: Examples
description: Copy-paste patterns for @echojs-ecosystem/utils.
package: '@echojs-ecosystem/utils'
---

# Examples

| Example | Topic |
| ------- | ----- |
| [Window Size](/docs/packages/utils/examples/window-size) | Viewport `width` / `height` |
| [Media Query](/docs/packages/utils/examples/media-query) | `prefers-color-scheme`, breakpoints |
| [Clipboard](/docs/packages/utils/examples/clipboard) | Copy to clipboard |
| [Debounce](/docs/packages/utils/examples/debounce) | Signal & function debounce |
| [Click Outside](/docs/packages/utils/examples/click-outside) | Dismiss overlays |
| [Local Storage](/docs/packages/utils/examples/local-storage) | Persist preferences |
| [HyperDOM Model](/docs/packages/utils/examples/hyperdom-model) | Model + lifecycle + utils |

See also the [Playground](/docs/packages/utils/playground) for live demos.

## Minimal patterns

**Online status**

```ts
import { online } from '@echojs-ecosystem/utils/online'

const online = online()
online.$value // bind in view
online.dispose()
```

**Hotkey**

```ts
import { hotkeys } from '@echojs-ecosystem/utils/hotkeys'

const hotkeys = hotkeys('meta+k', (e) => {
  openCommandPalette()
})
// hotkeys.dispose() when done
```

**Previous value**

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { previous } from '@echojs-ecosystem/utils/previous'

const $step = signal(1)
const prev = previous($step)
```
