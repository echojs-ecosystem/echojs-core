import { createDerivedReadonlyStore } from "./create-derived-readonly-store";
import type { ReadonlyStore, SelectOptions, Store } from "./types";

export const select = <State, Selected>(
  store: Store<State>,
  selector: (state: State) => Selected,
  options?: SelectOptions<Selected>,
): ReadonlyStore<Selected> => {
  return createDerivedReadonlyStore(() => selector(store.value()), {
    name: options?.name,
    equals: options?.equals,
  });
};
