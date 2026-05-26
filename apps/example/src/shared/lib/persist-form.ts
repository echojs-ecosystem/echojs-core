import type { Signal } from "@echojs-ecosystem/reactivity";
import type { Persistable } from "@echojs/persist";

type ValueField<T> = {
  $value: Signal<T>;
  set: (next: T) => void;
};

type ItemsField<T> = {
  $items: Signal<T[]>;
  replace: (next: T[]) => void;
};

export const fieldAsPersistable = <T>(field: ValueField<T>): Persistable<T> => {
  return {
    value: () => field.$value.peek() as T,
    set: (next) => field.set(next),
    subscribe(listener) {
      let prev = field.$value.peek() as T;
      return field.$value.subscribe(() => {
        const next = field.$value.peek() as T;
        listener(next, prev);
        prev = next;
      });
    },
  };
};

export const fieldArrayAsPersistable = <T>(fieldArray: ItemsField<T>): Persistable<T[]> => {
  return {
    value: () => [...(fieldArray.$items.peek() as T[])],
    set: (next) => fieldArray.replace([...next]),
    subscribe(listener) {
      let prev = [...(fieldArray.$items.peek() as T[])];
      return fieldArray.$items.subscribe(() => {
        const next = [...(fieldArray.$items.peek() as T[])];
        listener(next, prev);
        prev = next;
      });
    },
  };
};
