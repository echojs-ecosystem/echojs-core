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

  const append = (item: Item): void => {
    $items.update((prev) => [...prev, item]);
  };

  const prepend = (item: Item): void => {
    $items.update((prev) => [item, ...prev]);
  };

  const removeAt = (index: number): void => {
    $items.update((prev) => prev.filter((_, i) => i !== index));
  };

  const move = (from: number, to: number): void => {
    $items.update((prev) => {
      if (from === to) return prev;
      if (from < 0 || to < 0) return prev;
      if (from >= prev.length || to >= prev.length) return prev;
      const next = prev.slice();
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item!);
      return next;
    });
  };

  const updateAt = (index: number, fn: (item: Item) => Item): void => {
    $items.update((prev) => prev.map((x, i) => (i === index ? fn(x) : x)));
  };

  const replace = (next: Item[]): void => {
    $items.set([...next]);
  };

  const reset = (): void => {
    $items.set([...initialSnapshot]);
  };

  return {
    $items,
    append,
    prepend,
    removeAt,
    move,
    updateAt,
    replace,
    reset,
  };
};
