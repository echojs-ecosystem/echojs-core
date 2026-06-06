---
title: Batch Updates
description: Coalesce multiple signal writes so dependents notify once.
package: "@echojs-ecosystem/reactivity"
---

# Batch Updates

When one user action touches **two or more signals**, wrap writes in `batch()` so shared effects run **once** instead of once per write.

## Problem

A form reset or filter apply updates `$page`, `$query`, and `$sort` together. Without batching, a derived effect may run twice with inconsistent intermediate state.

## Model

```ts
import { batch, effect, signal } from "@echojs-ecosystem/reactivity";
import type { Signal } from "@echojs-ecosystem/reactivity";
import { createModel } from "@echojs-ecosystem/hyperdom";

export interface BatchDemoVM {
  $a: Signal<number>;
  $b: Signal<number>;
  $effectRuns: Signal<number>;
  runBatchUpdate: () => void;
  runSequentialUpdate: () => void;
  reset: () => void;
}

export const createBatchDemoModel = createModel((): BatchDemoVM => {
  const $a = signal(0);
  const $b = signal(0);
  const $effectRuns = signal(0);

  effect(() => {
    void $a.value();
    void $b.value();
    $effectRuns.update((n) => n + 1);
  });

  return {
    $a,
    $b,
    $effectRuns,
    runBatchUpdate: () => {
      batch(() => {
        $a.update((n) => n + 1);
        $b.update((n) => n + 1);
      });
    },
    runSequentialUpdate: () => {
      $a.update((n) => n + 1);
      $b.update((n) => n + 1);
    },
    reset: () => {
      batch(() => {
        $a.set(0);
        $b.set(0);
        $effectRuns.set(0);
      });
    },
  };
}, "BatchDemoModel");
```

## Compare behavior

| Action | `$effectRuns` increment |
| --- | --- |
| `runBatchUpdate()` | **+1** (both writes, one flush) |
| `runSequentialUpdate()` | **+2** (one flush per write) |

## Takeaways

- Use `batch()` in event handlers that touch multiple signals
- `batch(fn)` returns whatever `fn()` returns — useful for transactional updates
- Reset helpers can batch too, avoiding flicker

## Related

- [Guides: Batching](/docs/packages/reactivity/guides/batching)
- [API: batch](/docs/packages/reactivity/api/batch)
