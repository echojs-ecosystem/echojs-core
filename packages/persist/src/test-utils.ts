import { createStore } from "@echojs-ecosystem/store";

import { createMemoryStorageAdapter, type MemoryStorageAdapter } from "./adapters/memory";
import { withStorage } from "./core/with-storage";
import type {
  FieldArrayLike,
  FieldLike,
  Persistable,
  PersistableForm,
  PersistOptions,
} from "./core/types";

const attachExtend = <T extends object>(target: T) => {
  const extendable = target as T & {
    extend<R>(extension: (target: T) => R): T & R;
  };

  extendable.extend = <R>(extension: (target: T) => R) => {
    const result = extension(target);
    Object.assign(target, result);
    return target as T & R;
  };

  return extendable;
};

export const createFakeField = <Value>(
  initial: Value,
  options?: { name?: string },
) => {
  let value = initial;
  const initialValue = initial;
  const listeners = new Set<(value: Value, prevValue: Value) => void>();

  const field: FieldLike<Value> = {
    kind: "field",
    name: options?.name,
    value: () => value,
    set(next) {
      const prev = value;
      value = next;
      for (const listener of listeners) {
        listener(next, prev);
      }
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    reset() {
      field.set(initialValue);
    },
  };

  return attachExtend(field);
};

export const createFakeFieldArray = <Item>(
  initial: Item[] = [],
  options?: { name?: string },
) => {
  let value = [...initial];
  const initialValue = [...initial];
  const listeners = new Set<(value: Item[], prevValue: Item[]) => void>();

  const fieldArray: FieldArrayLike<Item> = {
    kind: "field-array",
    name: options?.name,
    value: () => value,
    set(next) {
      const prev = value;
      value = next;
      for (const listener of listeners) {
        listener(next, prev);
      }
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    push(item) {
      fieldArray.set([...value, item]);
    },
    remove(index) {
      fieldArray.set(value.filter((_, i) => i !== index));
    },
    reset() {
      fieldArray.set([...initialValue]);
    },
  };

  return attachExtend(fieldArray);
};

export const createFakeForm = <Value extends object>(initial: Value) => {
  let value = initial;
  const initialValue = initial;
  const listeners = new Set<(value: Value, prevValue: Value) => void>();

  const form: PersistableForm<Value> = {
    kind: "form",
    value: () => value,
    set(next) {
      const prev = value;
      value = next;
      for (const listener of listeners) {
        listener(next, prev);
      }
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    reset() {
      form.set(initialValue);
    },
  };

  return attachExtend(form);
};

export const createFakePersistable = <Value>(initial: Value): Persistable<Value> => {
  return createFakeField(initial);
};

export const flushMicrotasks = async (): Promise<void> => {
  await Promise.resolve();
  await Promise.resolve();
};

export const setupMemoryPersist = <Value, Snapshot = Value>(
  initial: Value,
  options: PersistOptions<Value, Snapshot> & { hydrate?: boolean },
  adapter: MemoryStorageAdapter = createMemoryStorageAdapter(),
) => {
  const store = createStore(initial).extend(withStorage(adapter, { hydrate: false, ...options }));

  const wait = async () => {
    await store.persist.hydrate();
    await flushMicrotasks();
  };

  const save = async () => {
    await store.persist.save();
    await flushMicrotasks();
  };

  return { store, adapter, wait, save };
};
