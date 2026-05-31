import { computed, effect } from "@echojs-ecosystem/reactivity";

import { createStoreEvent } from "./create-store-event";
import { resolveEquals } from "./resolve-equals";
import type { EqualsOption, ReadonlyStore, StoreEventPayload } from "./types";

export const createDerivedReadonlyStore = <Selected>(
  read: () => Selected,
  options?: {
    name?: string;
    equals?: EqualsOption<Selected>;
  },
): ReadonlyStore<Selected> => {
  const equals = resolveEquals(options?.equals);
  const $value = computed(read);
  const changed = createStoreEvent<StoreEventPayload<Selected>>();
  const listeners = new Set<(value: Selected, prevValue: Selected) => void>();

  let prev = read();

  effect(() => {
    const next = read();
    if (equals(prev, next)) {
      return;
    }
    const previous = prev;
    prev = next;
    changed.emit({ value: next, prevValue: previous });
    for (const listener of listeners) {
      listener(next, previous);
    }
  });

  return {
    kind: "readonly-store",
    name: options?.name,
    $value,
    changed,
    value() {
      return $value.value() as Selected;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
};
