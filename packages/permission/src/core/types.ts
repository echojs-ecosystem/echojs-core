import type { ReadonlySignal, Signal } from "@echojs-ecosystem/reactivity";

export type PermissionRule<Payload = void> =
  | boolean
  | (Payload extends void
      ? () => boolean | Promise<boolean>
      : (payload: Payload) => boolean | Promise<boolean>);

export type PermissionActionEntry = string | { name: string; type: unknown };

export type PermissionSchema = Record<string, readonly PermissionActionEntry[]>;

type ActionName<E extends PermissionActionEntry> = E extends string
  ? E
  : E extends { name: infer N extends string }
    ? N
    : never;

type ActionPayload<E extends PermissionActionEntry> = E extends string
  ? void
  : E extends { type: infer P }
    ? P
    : void;

export type ActionsMap<T extends readonly PermissionActionEntry[]> = {
  [E in T[number] as ActionName<E>]: ActionPayload<E>;
};

export type SetupConfigForResource<Actions extends readonly PermissionActionEntry[]> = {
  [K in keyof ActionsMap<Actions>]: PermissionRule<ActionsMap<Actions>[K]>;
};

export type PermissionSetupConfig<Schema extends PermissionSchema> = {
  [R in keyof Schema]: SetupConfigForResource<Schema[R]>;
};

export type PermissionCheckKey<Schema extends PermissionSchema> = {
  [R in keyof Schema & string]: Schema[R] extends readonly PermissionActionEntry[]
    ? `${R}.${ActionName<Schema[R][number]> & string}`
    : never;
}[keyof Schema & string];

type FindActionPayload<
  Actions extends readonly PermissionActionEntry[],
  A extends string,
> = Actions extends readonly [infer Head, ...infer Tail]
  ? Head extends string
    ? Head extends A
      ? void
      : Tail extends readonly PermissionActionEntry[]
        ? FindActionPayload<Tail, A>
        : never
    : Head extends { name: infer N extends string; type: infer P }
      ? N extends A
        ? P
        : Tail extends readonly PermissionActionEntry[]
          ? FindActionPayload<Tail, A>
          : never
      : Tail extends readonly PermissionActionEntry[]
        ? FindActionPayload<Tail, A>
        : never
  : never;

export type CheckPayload<
  Schema extends PermissionSchema,
  Key extends PermissionCheckKey<Schema>,
> = Key extends `${infer R}.${infer A}`
  ? R extends keyof Schema
    ? FindActionPayload<Schema[R], A>
    : never
  : never;

export type PermissionSnapshot = {
  version: number;
  ready: boolean;
  rules: Record<string, Record<string, boolean>>;
};

export type PermissionCheckEventPayload = {
  key: string;
  result: boolean;
  payload?: unknown;
};

export type PermissionHydrateEventPayload = {
  snapshot: PermissionSnapshot;
};

export type PermissionEventMap = {
  setup: void;
  change: void;
  reset: void;
  hydrate: PermissionHydrateEventPayload;
  check: PermissionCheckEventPayload;
};

export type PermissionEvent<Payload> = {
  watch(listener: (payload: Payload) => void): () => void;
  emit(payload: Payload): void;
};

export type PermissionEvents = {
  [K in keyof PermissionEventMap]: PermissionEvent<PermissionEventMap[K]>;
};

export type PermissionInstance<Schema extends PermissionSchema = PermissionSchema> = {
  setup(config: PermissionSetupConfig<Schema>): void;

  check<Key extends PermissionCheckKey<Schema>>(
    key: Key,
    ...args: CheckPayload<Schema, Key> extends void ? [] : [payload: CheckPayload<Schema, Key>]
  ): boolean;

  checkAsync<Key extends PermissionCheckKey<Schema>>(
    key: Key,
    ...args: CheckPayload<Schema, Key> extends void ? [] : [payload: CheckPayload<Schema, Key>]
  ): Promise<boolean>;

  can: PermissionInstance<Schema>["check"];
  cannot: PermissionInstance<Schema>["check"];

  isReady(): boolean;
  setReady(value: boolean): void;

  reset(): void;

  hydrate(snapshot: PermissionSnapshot): void;
  dehydrate(): PermissionSnapshot;

  subscribe(listener: () => void): () => void;

  on<E extends keyof PermissionEventMap>(
    event: E,
    listener: (payload: PermissionEventMap[E]) => void,
  ): () => void;

  events: PermissionEvents;

  $ready: Signal<boolean>;
  $version: Signal<number>;
  $snapshot: ReadonlySignal<PermissionSnapshot | null>;
};
