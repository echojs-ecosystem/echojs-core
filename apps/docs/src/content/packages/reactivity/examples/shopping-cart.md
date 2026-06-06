---
title: Shopping Cart
description: Line items in a signal with computed totals and immutable quantity updates.
package: "@echojs-ecosystem/reactivity"
---

# Shopping Cart

Cart state is an **array of line objects** in a signal. Totals and item counts are **`computed`** — the UI always reflects current lines without manual recalculation.

## Problem

Add items, change quantities, remove zero-qty lines, and show live **total price** and **item count**.

## Model

```ts
import { computed, signal } from "@echojs-ecosystem/reactivity";
import type { ReadonlySignal, Signal } from "@echojs-ecosystem/reactivity";
import { createModel } from "@echojs-ecosystem/hyperdom";

export type CartLine = { sku: string; label: string; price: number; qty: number };

const CATALOG: Record<string, { label: string; price: number }> = {
  cpu: { label: "CPU kit", price: 420 },
  ram: { label: "RAM 32GB", price: 180 },
};

export interface CartVM {
  $lines: Signal<CartLine[]>;
  $total: ReadonlySignal<number>;
  $itemCount: ReadonlySignal<number>;
  addItem: (sku: string) => void;
  changeQty: (sku: string, delta: number) => void;
  clear: () => void;
}

export const createCartModel = createModel((): CartVM => {
  const $lines = signal<CartLine[]>([
    { sku: "cpu", label: "CPU kit", price: 420, qty: 1 },
    { sku: "ram", label: "RAM 32GB", price: 180, qty: 2 },
  ]);

  const $total = computed(() =>
    $lines.value().reduce((sum, line) => sum + line.price * line.qty, 0),
  );

  const $itemCount = computed(() =>
    $lines.value().reduce((sum, line) => sum + line.qty, 0),
  );

  return {
    $lines,
    $total,
    $itemCount,
    addItem: (sku) => {
      const meta = CATALOG[sku];
      if (!meta) return;
      $lines.update((lines) => {
        const existing = lines.find((line) => line.sku === sku);
        if (existing) {
          return lines.map((line) =>
            line.sku === sku ? { ...line, qty: line.qty + 1 } : line,
          );
        }
        return [...lines, { sku, label: meta.label, price: meta.price, qty: 1 }];
      });
    },
    changeQty: (sku, delta) => {
      $lines.update((lines) =>
        lines
          .map((line) =>
            line.sku === sku ? { ...line, qty: Math.max(0, line.qty + delta) } : line,
          )
          .filter((line) => line.qty > 0),
      );
    },
    clear: () => $lines.set([]),
  };
}, "CartModel");
```

## View sketch

```ts
p(null, () => `Total: ${vm.$total.value()} (${vm.$itemCount.value()} items)`);

List(
  () => vm.$lines.value(),
  (line) =>
    li(null, [
      span(null, `${line.label} × ${line.qty}`),
      button({ onClick: () => vm.changeQty(line.sku, -1) }, "−"),
      button({ onClick: () => vm.changeQty(line.sku, 1) }, "+"),
    ]),
);
```

## Takeaways

- Derive aggregates with `computed`, not `effect()` + extra signals
- Updating qty uses `.map` + filter — same immutable pattern as todos
- `.subscribe` on `$total` is optional for analytics/logging side effects

## Related

- [Guides: Computed Values](/docs/packages/reactivity/guides/computed)
- [Guides: Immutable Updates](/docs/packages/reactivity/guides/immutable-updates)
- [Example: Todo List](/docs/packages/reactivity/examples/todo-list)
