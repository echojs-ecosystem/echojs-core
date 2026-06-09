---
title: HyperDOM Model
description: Use utils composables inside a HyperDOM model with lifecycle cleanup.
package: '@echojs-ecosystem/utils'
---

# HyperDOM Model

Combine `@echojs-ecosystem/utils` with a HyperDOM model and tear down side
effects when the model is disposed.

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { createModel, h, Show } from '@echojs-ecosystem/hyperdom'
import { createCleanupScope } from '@echojs-ecosystem/utils'
import { windowSize } from '@echojs-ecosystem/utils/window-size'
import { clickOutside } from '@echojs-ecosystem/utils/click-outside'

export const createDropdownModel = createModel(() => {
  const scope = createCleanupScope()
  const $open = signal(false)
  const $panel = signal<HTMLDivElement | null>(null)

  const size = windowSize({ initialWidth: 0, initialHeight: 0 })
  const clickOutside = clickOutside($panel, () => $open.set(false))

  scope.add(() => size.dispose())
  scope.add(() => clickOutside.dispose())

  return {
    $open,
    $panel,
    size,
    toggle: () => $open.update((v) => !v),
    dispose: () => scope.dispose(),
  }
}, 'DropdownModel')
```

```ts
const DropdownView = ({ model }: { model: ReturnType<ReturnType<typeof createDropdownModel>> }) =>
  h('div', {}, [
    h('button', { onClick: model.toggle }, 'Menu'),
    Show({
      when: model.$open,
      children: () =>
        h('div', { ref: model.$panel }, ['Viewport: ', model.size.$width, 'px']),
    }),
  ])
```

## Patterns

| Concern | Approach |
| ------- | -------- |
| Teardown | `createCleanupScope` + `model.dispose()` |
| Overlay dismiss | `clickOutside($ref, close)` |
| Responsive layout | `windowSize` or `breakpoints` |
| Bindings | Pass `$signals` to HyperDOM children |

See [Signals & HyperDOM](/docs/packages/utils/guides/signals-and-hyperdom).
