---
title: Example
description: Runnable patterns for @echojs/reactivity from the EchoJS example app.
package: "@echojs/reactivity"
---

# Example — Reactivity

Минимальный счётчик и список из **`apps/example`** (`features/reactivity-counter`).

## Model — signals

```ts
import { signal } from "@echojs/reactivity";
import { createModel } from "@echojs/hyperdom";

export const createCounterModel = createModel(() => {
  const $count = signal(0);
  const $name = signal("Echo");
  const $items = signal(["A", "B", "C"]);

  return {
    $count,
    $name,
    $items,
    increment: () => $count.update((n) => n + 1),
    appendItem: () =>
      $items.set([...$items.value(), String($items.value().length + 1)]),
    resetItems: () => $items.set(["X"]),
    setName: (next: string) => $name.set(next),
  };
}, "CounterModel");
```

## View — read signals in HyperDOM

```ts
import { Show, createView } from "@echojs/hyperdom";
import { button, span, section } from "@echojs/hyperdom";

export const CounterView = createView((vm) =>
  section(
    { class: () => ({ "is-positive": vm.$count.value() > 0 }) },
    button({ onClick: vm.increment }, () => "+1"),
    span(null, () => String(vm.$count.value())),
    Show(
      () => vm.$count.value() > 0,
      () => span(null, "Count is positive"),
    ),
  ),
  "CounterView",
);
```

`() => vm.$count.value()` в children и `class:` регистрирует зависимости — DOM обновляется без полного re-render дерева.

## Batch update

```ts
import { batch, signal } from "@echojs/reactivity";

const a = signal(0);
const b = signal(0);

batch(() => {
  a.set(1);
  b.set(2);
});
```

## Live app

| Resource | Path |
| --- | --- |
| Example lab | `apps/example` → docs module **Reactivity** |
| Source | `apps/example/src/features/reactivity-counter/` |

## See also

- Usage — `/docs/packages/reactivity/usage`
- HyperDOM Example — `/docs/packages/hyperdom/example`
