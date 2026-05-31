import type { Store, StoreExtension } from "./types";

export const withActions = <
  State,
  const Actions extends Record<string, (store: Store<State>) => unknown>,
>(
  actions: Actions,
): StoreExtension<
  State,
  { [K in keyof Actions]: ReturnType<Actions[K]> }
> => {
  return (store) => {
    const result = {} as { [K in keyof Actions]: ReturnType<Actions[K]> };
    for (const key of Object.keys(actions) as (keyof Actions)[]) {
      const factory = actions[key];
      if (!factory) continue;
      result[key] = factory(store) as ReturnType<Actions[typeof key]>;
    }
    return result;
  };
};
