import type { Signal } from "@echojs-ecosystem/reactivity";
import type { Persistable, PersistExtension, PersistExtensionResult } from "@echojs/persist";
import type { Field, FieldArray, FieldArrayCore, FieldCore } from "../types";

type ValueField<T> = {
  $value: Signal<T>;
  set: (next: T) => void;
};

type ItemsField<T> = {
  $items: Signal<T[]>;
  replace: (next: T[]) => void;
};

const fieldPersistable = <T>(field: ValueField<T>): Persistable<T> => ({
  value: () => field.$value.peek() as T,
  set: (next: T) => field.set(next),
  subscribe(listener: (value: T, prevValue: T) => void) {
    let prev = field.$value.peek() as T;
    return field.$value.subscribe(() => {
      const next = field.$value.peek() as T;
      listener(next, prev);
      prev = next;
    });
  },
});

const fieldArrayPersistable = <T>(fieldArray: ItemsField<T>): Persistable<T[]> => ({
  value: () => [...(fieldArray.$items.peek() as T[])],
  set: (next: T[]) => fieldArray.replace([...next]),
  subscribe(listener: (value: T[], prevValue: T[]) => void) {
    let prev = [...(fieldArray.$items.peek() as T[])];
    return fieldArray.$items.subscribe(() => {
      const next = [...(fieldArray.$items.peek() as T[])];
      listener(next, prev);
      prev = next;
    });
  },
});

export const attachFieldPersist = <T>(field: FieldCore<T>): Field<T> => {
  const { value, subscribe } = fieldPersistable(field);
  const target = Object.assign(field, { value, subscribe }) as Field<T>;

  target.extend = <Snapshot>(extension: PersistExtension<T, Snapshot>) => {
    const result = extension(fieldPersistable(target));
    Object.assign(target, result);
    return target as Field<T> & PersistExtensionResult<T, Snapshot>;
  };

  return target;
};

export const attachFieldArrayPersist = <T>(fieldArray: FieldArrayCore<T>): FieldArray<T> => {
  const { value, set, subscribe } = fieldArrayPersistable(fieldArray);
  const target = Object.assign(fieldArray, { value, set, subscribe }) as FieldArray<T>;

  target.extend = <Snapshot>(extension: PersistExtension<T[], Snapshot>) => {
    const result = extension(fieldArrayPersistable(target));
    Object.assign(target, result);
    return target as FieldArray<T> & PersistExtensionResult<T[], Snapshot>;
  };

  return target;
};

/** Persist API поверх `createField`: `value` / `subscribe`; запись — через `field.set()`. */
export type FieldPersistMethods<T> = {
  value(): T;
  subscribe(listener: (value: T, prevValue: T) => void): () => void;
  extend<Snapshot = T>(
    extension: PersistExtension<T, Snapshot>,
  ): Field<T> & PersistExtensionResult<T, Snapshot>;
};

export type FieldArrayPersistMethods<T> = {
  value(): T[];
  set(next: T[]): void;
  subscribe(listener: (value: T[], prevValue: T[]) => void): () => void;
  extend<Snapshot = T[]>(
    extension: PersistExtension<T[], Snapshot>,
  ): FieldArray<T> & PersistExtensionResult<T[], Snapshot>;
};
