import { signal } from "@echojs-ecosystem/reactivity";

import type { StoreInternals } from "./create-store-internals";

export const applyStoreUpdate = <State>(
  internals: StoreInternals<State>,
  $value: ReturnType<typeof signal<State>>,
  next: State,
): void => {
  const prev = $value.peek() as State;
  if (internals.equals(prev, next)) {
    return;
  }
  $value.set(next);
  internals.notifyChanged(next, prev);
};
