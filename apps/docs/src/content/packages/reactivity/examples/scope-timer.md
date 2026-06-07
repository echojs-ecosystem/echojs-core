---
title: Scope & Timer
description: Start and stop an interval with scope, effect, and cleanup.
package: '@echojs-ecosystem/reactivity'
---

# Scope & Timer

Side effects like `setInterval` must **stop** when a feature unmounts or a
toggle turns off. Combine `scope()`, `effect()`, and `cleanup()` so teardown is
automatic.

## Problem

Run a clock while `$enabled` is true; clear the interval when disabled or when
the scope disposes.

## Model

```ts
import { cleanup, effect, scope, signal } from '@echojs-ecosystem/reactivity'
import type { Signal } from '@echojs-ecosystem/reactivity'
import { createModel } from '@echojs-ecosystem/hyperdom'

export interface TimerVM {
  $enabled: Signal<boolean>
  $ticks: Signal<number>
  toggle: () => void
  reset: () => void
}

export const createTimerModel = createModel((): TimerVM => {
  const $enabled = signal(false)
  const $ticks = signal(0)

  scope(() => {
    effect(() => {
      if (!$enabled.value()) return

      const id = window.setInterval(() => {
        $ticks.update((n) => n + 1)
      }, 1000)

      cleanup(() => window.clearInterval(id))
    })
  })

  return {
    $enabled,
    $ticks,
    toggle: () => $enabled.update((v) => !v),
    reset: () => $ticks.set(0),
  }
}, 'TimerModel')
```

## How it works

1. `scope()` opens a disposal boundary for the model lifetime
2. `effect()` re-runs when `$enabled` changes
3. When `$enabled` is false, the effect body returns early — previous interval
   is cleared via `cleanup`
4. When `$enabled` is true, a new interval starts and registers its `cleanup`

## Takeaways

- `cleanup(fn)` must run **synchronously** inside `scope()`
- Prefer `cleanup` over storing interval ids on the VM when logic stays inside
  reactive boundaries
- Same pattern works for `AbortController`, event listeners, subscriptions

## Related

- [Guides: Scopes & Cleanup](/docs/packages/reactivity/guides/scopes-and-cleanup)
- [Guides: Effects](/docs/packages/reactivity/guides/effects)
