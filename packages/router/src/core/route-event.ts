import type { RouteEvent } from "./types.js";

export type RouteEventEmitter<T> = RouteEvent<T> & {
  emit(payload: T): void;
};

export const createRouteEvent = <T>(): RouteEventEmitter<T> => {
  const listeners = new Set<(payload: T) => void>();

  return {
    subscribe(listener: (payload: T) => void): () => void {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    emit(payload: T): void {
      for (const listener of listeners) {
        listener(payload);
      }
    },
  };
};
