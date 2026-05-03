import { signal } from "@echojs-ecosystem/reactivity";
import type { FieldArray } from "../types";

/**
 * Creates a dynamic array helper for form state (append/remove/move/update).
 *
 * This primitive only manages the array itself; compose it with fields/fieldSets for rich models.
 */
export const createFieldArray = <Item>(initial: Item[] = []): FieldArray<Item> => {
  const initialSnapshot = [...initial];
  const $items = signal<Item[]>([...initial]);

  return {
    $items,

    append: (item) => $items.update((prev) => [...prev, item]),
    prepend: (item) => $items.update((prev) => [item, ...prev]),
    removeAt: (index) => $items.update((prev) => prev.filter((_, i) => i !== index)),
    move: (from, to) =>
      $items.update((prev) => {
        if (from === to) return prev;
        if (from < 0 || to < 0) return prev;
        if (from >= prev.length || to >= prev.length) return prev;
        const next = prev.slice();
        const [item] = next.splice(from, 1);
        next.splice(to, 0, item!);
        return next;
      }),
    updateAt: (index, fn) =>
      $items.update((prev) => prev.map((x, i) => (i === index ? fn(x) : x))),
    replace: (next) => $items.set([...next]),
    reset: () => $items.set([...initialSnapshot]),
  };
};

