import { signal } from "@echojs-ecosystem/reactivity";

import { checkPermission, checkPermissionAsync } from "./check";
import { createPermissionEvents } from "./events";
import { dehydratePermission, hydratePermission } from "./hydration";
import { createReadyState } from "./ready";
import { applySetupConfig } from "./setup";
import type {
  PermissionEventMap,
  PermissionInstance,
  PermissionSchema,
  PermissionSetupConfig,
  PermissionSnapshot,
} from "./types";
import { createPermissionInstanceId } from "../utils/id";
import type { RuleStore } from "../utils/serialize";

export type PermissionInternals = {
  id: string;
  rules: RuleStore;
};

export const createPermissionInstance = <Schema extends PermissionSchema>(): PermissionInstance<Schema> => {
  const rules: RuleStore = new Map();
  const subscribers = new Set<() => void>();
  const events = createPermissionEvents();

  const $ready = signal(false);
  const $version = signal(0);
  const $snapshot = signal<PermissionSnapshot | null>(null);

  const notifySubscribers = (): void => {
    for (const listener of subscribers) {
      listener();
    }
  };

  const bumpVersion = (): void => {
    $version.update((value) => value + 1);
    notifySubscribers();
    events.change.emit();
  };

  const readyState = createReadyState($ready, bumpVersion);

  const updateSnapshot = (): void => {
    $snapshot.set(
      dehydratePermission({
        rules,
        version: $version.peek(),
        ready: $ready.peek(),
      }),
    );
  };

  const checkContext = {
    rules,
    isReady: readyState.isReady,
  };

  const check: PermissionInstance<Schema>["check"] = (key, ...args) => {
    const payload = args[0];
    const result = checkPermission(checkContext, key as string, payload);

    events.check.emit({
      key: key as string,
      result,
      payload,
    });

    return result;
  };

  const checkAsync: PermissionInstance<Schema>["checkAsync"] = async (key, ...args) => {
    const payload = args[0];
    const result = await checkPermissionAsync(checkContext, key as string, payload);

    events.check.emit({
      key: key as string,
      result,
      payload,
    });

    return result;
  };

  const cannot = ((key, ...args) => {
    return !check(key, ...args);
  }) as PermissionInstance<Schema>["cannot"];

  const instance: PermissionInstance<Schema> = {
    $ready,
    $version,
    $snapshot: $snapshot.readonly(),

    events,

    on<E extends keyof PermissionEventMap>(
      event: E,
      listener: (payload: PermissionEventMap[E]) => void,
    ): () => void {
      return events[event].watch(listener);
    },

    subscribe(listener: () => void): () => void {
      subscribers.add(listener);
      return () => {
        subscribers.delete(listener);
      };
    },

    setup(config: PermissionSetupConfig<Schema>): void {
      applySetupConfig(rules, config as PermissionSetupConfig<Record<string, readonly string[]>>);
      $ready.set(true);
      bumpVersion();
      updateSnapshot();
      events.setup.emit();
    },

    check,
    checkAsync,
    can: check,
    cannot,

    isReady: readyState.isReady,

    setReady(value: boolean): void {
      readyState.setReady(value);
      updateSnapshot();
    },

    reset(): void {
      rules.clear();
      $ready.set(false);
      bumpVersion();
      updateSnapshot();
      events.reset.emit();
    },

    hydrate(snapshot: PermissionSnapshot): void {
      const hydrated = hydratePermission(rules, snapshot);
      $version.set(hydrated.version);
      $ready.set(hydrated.ready);
      bumpVersion();
      updateSnapshot();
      events.hydrate.emit({ snapshot });
    },

    dehydrate(): PermissionSnapshot {
      const snapshot = dehydratePermission({
        rules,
        version: $version.peek(),
        ready: $ready.peek(),
      });

      $snapshot.set(snapshot);
      return snapshot;
    },
  };

  const internals: PermissionInternals = {
    id: createPermissionInstanceId(),
    rules,
  };

  Object.defineProperty(instance, "__permissionInternals", {
    value: internals,
    enumerable: false,
    configurable: false,
  });

  return instance;
};
