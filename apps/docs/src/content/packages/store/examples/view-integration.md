---
title: View Reads Store
description: HyperDOM views and effects reading module-level store state.
package: '@echojs-ecosystem/store'
---

# View Reads Store

Views consume store state through reactive children and occasional `effect()`
calls for non-DOM side work.

## Problem

Update the DOM and document metadata when a module-level store changes — without
re-mounting the view tree.

## Side effect on theme

```ts
import { effect } from '@echojs-ecosystem/reactivity'
import { themeStore } from './state.model.js'

effect(() => {
  document.documentElement.dataset.theme = themeStore.value()
})
```

`effect()` tracks `themeStore.$value` via `.value()` and re-runs when theme
changes.

## Reactive view children

```ts
import { button } from '@echojs-ecosystem/hyperdom'
import { themeStore } from './state.model.js'

button(
  { onClick: () => themeStore.toggle() },
  () => `Theme: ${themeStore.value()}`
)
```

The `() => themeStore.value()` child form registers a HyperDOM effect — only the
button text updates when theme changes.

## Model accessor pattern

Inside `createModel`, expose accessors instead of the raw store when you want
tighter encapsulation:

```ts
const count = () => counterStore.value()
```

HyperDOM views call `vm.count()` inside reactive children — dependencies track
automatically.

## See also

- [Guides: HyperDOM Integration](/docs/packages/store/guides/hyperdom-integration)
- [Examples: Theme & Counter](/docs/packages/store/examples/theme-and-counter)
