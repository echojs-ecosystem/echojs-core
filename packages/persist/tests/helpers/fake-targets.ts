import type { FieldArrayLike, FieldLike, Persistable, PersistableForm } from "../../src/core/types.js";

type ExtendableTarget<T, R> = T & {
  extend?<R2>(extension: (target: T) => R2): T & R2;
};

const attachExtend = <T extends object, R>(target: T): ExtendableTarget<T, R> => {
  (target as ExtendableTarget<T, R>).extend = (extension) => {
    const result = extension(target);
    Object.assign(target, result);
    return target as T & R;
  };
  return target as ExtendableTarget<T, R>;
};

export const createFakeField = <Value>(
  initial: Value,
  options?: { name?: string },
): FieldLike<Value> & { extend<R>(extension: (target: FieldLike<Value>) => R): FieldLike<Value> & R } => {
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
): FieldArrayLike<Item> & {
  extend<R>(extension: (target: FieldArrayLike<Item>) => R): FieldArrayLike<Item> & R;
} => {
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

export const createFakeForm = <Value extends object>(
  initial: Value,
): PersistableForm<Value> & {
  extend<R>(extension: (target: PersistableForm<Value>) => R): PersistableForm<Value> & R;
} => {
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
