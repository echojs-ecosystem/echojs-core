---
title: Counter
description: Basic writable signal with increment action and reactive HyperDOM view.
package: "@echojs-ecosystem/reactivity"
---

# Counter

The smallest useful pattern: one number in a signal, actions that mutate it, a view that re-renders only the reactive parts.

## Problem

Track a numeric value and update the DOM when it changes — without re-mounting the whole component tree.

## Model

```ts
import { signal } from "@echojs-ecosystem/reactivity";
import type { Signal } from "@echojs-ecosystem/reactivity";
import { createModel } from "@echojs-ecosystem/hyperdom";

export interface CounterVM {
  $count: Signal<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const createCounterModel = createModel((): CounterVM => {
  const $count = signal(0);

  return {
    $count,
    increment: () => $count.update((n) => n + 1),
    decrement: () => $count.update((n) => n - 1),
    reset: () => $count.set(0),
  };
}, "CounterModel");
```

## View

```ts
import { Show, createView } from "@echojs-ecosystem/hyperdom";
import { button, span, section } from "@echojs-ecosystem/hyperdom";
import type { CounterVM } from "./counter.model.js";

export const CounterView = createView((vm: CounterVM) =>
  section(
    { class: () => ({ "is-positive": vm.$count.value() > 0 }) },
    [
      button({ onClick: vm.decrement }, "-1"),
      button({ onClick: vm.increment }, "+1"),
      span(null, () => String(vm.$count.value())),
      Show(
        () => vm.$count.value() > 0,
        () => span(null, "Count is positive"),
      ),
    ],
  ),
  "CounterView",
);
```

`() => vm.$count.value()` registers a dependency — only that text node updates when the count changes.

## Takeaways

- Prefer `$count.update(fn)` over read-then-set when the next value depends on the previous one
- Use `Show` for conditional UI driven by signal reads
- Reactive `class: () => …` tracks signals used inside the function

## Related

- [Guides: Signals](/docs/packages/reactivity/guides/signals)
- [HyperDOM Integration](/docs/packages/reactivity/guides/hyperdom-integration)
