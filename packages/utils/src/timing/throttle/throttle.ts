import { effect, signal, type ReadonlySignal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { isClient } from "../../core/env";

export const throttle = <T>(source: ReadonlySignal<T>, ms: number) => {
  const scope = createCleanupScope();
  const $value = signal(source.peek());

  let lastRun = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const stopEffect = effect(() => {
    const next = source.value();
    const now = Date.now();
    const remaining = ms - (now - lastRun);

    if (!isClient) {
      $value.set(next);
      return;
    }

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
      lastRun = now;
      $value.set(next);
      return;
    }

    if (!timer) {
      timer = setTimeout(() => {
        lastRun = Date.now();
        timer = undefined;
        $value.set(source.peek());
      }, remaining);
    }
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

export type ThrottledFn<T extends (...args: never[]) => void> = T & {
  cancel(): void;
  flush(): void;
};

export const throttleFn = <T extends (...args: never[]) => void>(
  fn: T,
  ms: number,
): ThrottledFn<T> => {
  let lastRun = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<T> | undefined;

  const throttled = ((...args: Parameters<T>) => {
    lastArgs = args;
    const now = Date.now();
    const remaining = ms - (now - lastRun);

    if (!isClient) {
      fn(...args);
      return;
    }

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
      lastRun = now;
      fn(...args);
      return;
    }

    if (!timer) {
      timer = setTimeout(() => {
        lastRun = Date.now();
        timer = undefined;
        if (lastArgs) fn(...lastArgs);
      }, remaining);
    }
  }) as ThrottledFn<T>;

  throttled.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
    lastArgs = undefined;
  };

  throttled.flush = () => {
    if (!lastArgs) return;
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    lastRun = Date.now();
    const args = lastArgs;
    fn(...args);
  };

  return throttled;
};
