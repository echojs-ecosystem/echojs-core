import type { PermissionEvent, PermissionEventMap, PermissionEvents } from "./types";

const createPermissionEvent = <Payload>(): PermissionEvent<Payload> => {
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

export const createPermissionEvents = (): PermissionEvents => {
  return {
    setup: createPermissionEvent<void>(),
    change: createPermissionEvent<void>(),
    reset: createPermissionEvent<PermissionEventMap["reset"]>(),
    hydrate: createPermissionEvent<PermissionEventMap["hydrate"]>(),
    check: createPermissionEvent<PermissionEventMap["check"]>(),
  };
};
