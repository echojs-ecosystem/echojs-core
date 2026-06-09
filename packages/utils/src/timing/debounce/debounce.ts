import { effect, signal, type ReadonlySignal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { isClient } from "../../core/env";

export const debounce = <T>(source: ReadonlySignal<T>, ms: number) => {
  const scope = createCleanupScope();
  const $value = signal(source.peek());

  let timer: ReturnType<typeof setTimeout> | undefined;

  const stopEffect = effect(() => {
    const next = source.value();
    if (timer) clearTimeout(timer);
    if (!isClient) {
      $value.set(next);
      return;
    }
    timer = setTimeout(() => $value.set(next), ms);
  });

  scope.add(() => {
    stopEffect();
    if (timer) clearTimeout(timer);
  });

  return {
    value: () => $value.value(),
    $value,
    dispose: () => scope.dispose(),
  };
};

export type DebouncedFn<T extends (...args: never[]) => void> = T & {
  cancel(): void;
  flush(): void;
};

export const debounceFn = <T extends (...args: never[]) => void>(
  fn: T,
  ms: number,
): DebouncedFn<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<T> | undefined;

  const debounced = ((...args: Parameters<T>) => {
    lastArgs = args;
    if (timer) clearTimeout(timer);
    if (!isClient) {
      fn(...args);
      return;
    }
    timer = setTimeout(() => {
      timer = undefined;
      if (lastArgs) fn(...lastArgs);
    }, ms);
  }) as DebouncedFn<T>;

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
    lastArgs = undefined;
  };

  debounced.flush = () => {
    if (!timer || !lastArgs) return;
    clearTimeout(timer);
    timer = undefined;
    const args = lastArgs;
    lastArgs = undefined;
    fn(...args);
  };

  return debounced;
};
