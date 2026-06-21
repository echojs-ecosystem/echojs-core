---
title: Signals & HyperDOM
description: Bind utils composables to HyperDOM views via $signals.
package: '@echojs-ecosystem/utils'
---

# Signals & HyperDOM

Every composable exposes **getters** (`width()`, `value()`) and **signals**
(`$width`, `$value`). In HyperDOM views, prefer the `$` signal for reactive
bindings — the getter is for imperative reads inside effects or callbacks.

## Binding a signal

```ts
import { windowSize } from '@echojs-ecosystem/utils/window-size'
import { h } from '@echojs-ecosystem/hyperdom'

const createLayoutModel = () => {
  const size = windowSize({ initialWidth: 0, initialHeight: 0 })

  return {
    size,
    dispose: () => size.dispose(),
  }
}

// In a view — pass $width directly as child or prop
const LayoutView = ({ size }: { size: ReturnType<typeof windowSize> }) =>
  h('p', {}, size.$width, ' × ', size.$height)
```

HyperDOM tracks signal reads when `$width` / `$height` are used as reactive
children or attributes.

## Effects vs getters

```ts
import { effect } from '@echojs-ecosystem/reactivity'
import { online } from '@echojs-ecosystem/utils/online'

const online = online()

// ✅ Tracks dependency
effect(() => {
  console.log('online:', online.value())
})

// ✅ One-off read (no subscription)
if (online.value()) sendBeacon()
```

Use getters inside `effect()` when you need side effects. Use `$value` in views
when the UI should update automatically.

## Cleanup in models

Group composables with [createCleanupScope](/docs/packages/utils/api/core) and
call `dispose()` when the model is destroyed (route change, feature teardown):

```ts
import { createModel } from '@echojs-ecosystem/hyperdom'
import { createCleanupScope } from '@echojs-ecosystem/utils'
import { windowSize } from '@echojs-ecosystem/utils/window-size'

export const createPanelModel = createModel(() => {
  const scope = createCleanupScope()
  const size = windowSize()
  scope.add(() => size.dispose())
  return { size, dispose: () => scope.dispose() }
}, 'PanelModel')
```

In views, use `ref(null)` for DOM-bound cleanup. For utils created in a model
factory, prefer `effect.mount` / `effect.unmount` in `createModel` or
`createCleanupScope`:

```ts
import { createCleanupScope } from '@echojs-ecosystem/utils'

const scope = createCleanupScope()
const size = windowSize()
const online = online()

scope.add(() => size.dispose())
scope.add(() => online.dispose())

// on destroy:
scope.dispose()
```

## Debounced search input

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { debounce } from '@echojs-ecosystem/utils/debounce'

const $query = signal('')
const debounced = debounce($query, 300)

effect(() => {
  const q = debounced.value()
  if (q) fetchResults(q)
})

// View binds to $query; effect reacts to debounced.$value
```

## See also

- [Reactive Targets](/docs/packages/utils/guides/reactive-targets)
- [Dispose & Cleanup](/docs/packages/utils/guides/dispose-and-cleanup)
- [HyperDOM: Reactive Children](/docs/packages/hyperdom/guides/reactive-children)
