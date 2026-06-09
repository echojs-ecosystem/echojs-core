---
title: Reactive Targets
description: Elements, getters, and signals as composable targets.
package: '@echojs-ecosystem/utils'
---

# Reactive Targets

Several utilities accept a **target** that can change over time — for example a
panel ref that starts as `null` and becomes an `HTMLElement` after mount.

## `MaybeSignalOrGetter<T>`

```ts
type MaybeSignalOrGetter<T> = T | ReadonlySignal<T> | (() => T)
```

Resolved at runtime via `toValue()`:

| You pass | Resolved as |
| -------- | ----------- |
| `element` | `element` |
| `() => element` | result of calling the getter |
| `signal(element)` | `signal.value()` |

## Utilities that support reactive targets

| Utility | Target type |
| ------- | ----------- |
| `elementSize` | `HTMLElement \| null` |
| `resizeObserver` | `HTMLElement \| null` |
| `intersectionObserver` | `HTMLElement \| null` |
| `clickOutside` | `HTMLElement \| null` |
| `hover` | `HTMLElement \| null` |
| `focus` | `HTMLElement \| null` |
| `fullscreen` | `Element \| null` |
| `scroll` | `Window \| HTMLElement \| Document` |
| `cssVar` | `HTMLElement` (optional) |

## Ref pattern with HyperDOM

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { clickOutside } from '@echojs-ecosystem/utils/click-outside'

const $panel = signal<HTMLElement | null>(null)

const clickOutside = clickOutside($panel, () => close())

// When $panel is set after mount, the internal effect re-subscribes
```

`clickOutside` runs an `effect()` that re-reads the target when the signal
changes.

## Element size after mount

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { elementSize } from '@echojs-ecosystem/utils/element-size'

const $root = signal<HTMLDivElement | null>(null)
const size = elementSize($root)

// size.$width / size.$height update when $root is set and on ResizeObserver
```

## Plain getter (no signal)

```ts
let panelEl: HTMLElement | null = null

clickOutside(() => panelEl, onOutsideClick)
```

Useful when the element is stored in a closure rather than a signal.

## `toValue` in your own code

```ts
import { toValue } from '@echojs-ecosystem/utils'

const resolve = (source: MaybeSignalOrGetter<string>) => toValue(source)
```

Same helper utils use internally — exported from the barrel and documented in
[Core](/docs/packages/utils/api/core).
