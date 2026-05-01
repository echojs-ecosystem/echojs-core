import { signal } from "@echojs-ecosystem/reactivity";
import type { Signal } from "@echojs-ecosystem/reactivity";
import { createModel } from "@echojs/hyperdom";

export interface Example1VM {
  $count: Signal<number>;
  $name: Signal<string>;
  $items: Signal<string[]>;

  increment: () => void;
  appendItem: () => void;
  resetItems: () => void;
  setName: (next: string) => void;
}

export const createExample1Model = createModel((): Example1VM => {
  const $count = signal(0);
  const $name = signal("Echo");
  const $items = signal(["A", "B", "C"]);

  return {
    $count,
    $name,
    $items,
    increment: () => $count.update((n) => n + 1),
    appendItem: () => $items.set([...$items.value(), String($items.value().length + 1)]),
    resetItems: () => $items.set(["X"]),
    setName: (next: string) => $name.set(next),
  };
});
