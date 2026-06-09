import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultWindow, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";

export interface LocalStorageOptions<T> {
  storage?: Storage;
  serialize?: (value: T) => string;
  deserialize?: (raw: string) => T;
}

const defaultSerialize = <T>(value: T) => JSON.stringify(value);
const defaultDeserialize = <T>(raw: string) => JSON.parse(raw) as T;

export const localStorage = <T>(
  key: string,
  initial: T,
  options: LocalStorageOptions<T> = {},
) => {
  const {
    storage = isClient ? defaultWindow?.localStorage : undefined,
    serialize = defaultSerialize,
    deserialize = defaultDeserialize,
  } = options;

  const scope = createCleanupScope();

  const read = (): T => {
    if (!isClient || !storage) return initial;
    try {
      const raw = storage.getItem(key);
      if (raw === null) return initial;
      return deserialize(raw);
    } catch {
      return initial;
    }
  };

  const $value = signal(read());

  const write = (next: T) => {
    $value.set(next);
    if (!isClient || !storage) return;
    try {
      storage.setItem(key, serialize(next));
    } catch {
      // quota or private mode
    }
  };

  const remove = () => {
    if (isClient && storage) storage.removeItem(key);
    $value.set(initial);
  };

  if (isClient && defaultWindow) {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key || event.storageArea !== storage) return;
      if (event.newValue === null) {
        $value.set(initial);
        return;
      }
      try {
        $value.set(deserialize(event.newValue));
      } catch {
        $value.set(initial);
      }
    };
    scope.add(eventListener(defaultWindow, "storage", onStorage).dispose);
  }

  return {
    value: () => $value.value(),
    set: write,
    remove,
    $value,
    dispose: () => scope.dispose(),
  };
};
