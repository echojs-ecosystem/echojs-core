import type { StoreEvent } from "./types";

export const createStoreEvent = <Payload>(): StoreEvent<Payload> => {
  const listeners = new Set<(payload: Payload) => void>();

  return {
    watch(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    emit(payload) {
      for (const listener of listeners) {
        listener(payload);
      }
    },
  };
};
