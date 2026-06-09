import { effect, signal, type ReadonlySignal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";

export const previous = <T>(source: ReadonlySignal<T>) => {
  const scope = createCleanupScope();
  const $value = signal<T | undefined>(undefined);

  let previous: T | undefined;

  const stopEffect = effect(() => {
    const current = source.value() as T;
    $value.set(previous);
    previous = current;
  });

  scope.add(stopEffect);

  return {
    value: () => $value.value(),
    $value,
    dispose: () => scope.dispose(),
  };
};
