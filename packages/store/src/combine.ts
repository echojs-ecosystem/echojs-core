import { createDerivedReadonlyStore } from "./create-derived-readonly-store";
import type { CombineOptions, ReadonlyStore, SourceValues, Store } from "./types";

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
