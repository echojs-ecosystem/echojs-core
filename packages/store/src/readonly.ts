import { toReadonlyStore } from "./to-readonly-store";
import type { ReadonlyStore, Store } from "./types";

export const readonly = <State>(store: Store<State>): ReadonlyStore<State> => {
  return toReadonlyStore(store);
};
