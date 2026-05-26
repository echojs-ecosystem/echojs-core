import { createDerivedReadonlyStore } from "./computed";
import type {
  CombineOptions,
  ReadonlyStore,
  SelectOptions,
  SourceValues,
  Store,
} from "./types";

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

type SourceStore = Store<unknown> | ReadonlyStore<unknown>;

export const combine = <Sources extends Record<string, SourceStore>, Result>(
  sources: Sources,
  combiner: (values: SourceValues<Sources>) => Result,
  options?: CombineOptions<Result>,
): ReadonlyStore<Result> => {
  const entries = Object.entries(sources) as [keyof Sources, SourceStore][];

  const readSources = (): SourceValues<Sources> => {
    const values = {} as SourceValues<Sources>;
    for (const [key, source] of entries) {
      values[key] = source.value() as SourceValues<Sources>[typeof key];
    }
    return values;
  };

  return createDerivedReadonlyStore(() => combiner(readSources()), {
    name: options?.name,
    equals: options?.equals,
  });
};
