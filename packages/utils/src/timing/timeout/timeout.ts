import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { isClient } from "../../core/env";

export const timeout = (callback: () => void, delay: number) => {
  const scope = createCleanupScope();
  const $pending = signal(false);

  let timer: ReturnType<typeof setTimeout> | undefined;

  const clear = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
    $pending.set(false);
  };

  const start = () => {
    clear();
    if (!isClient) return;
    $pending.set(true);
    timer = setTimeout(() => {
      timer = undefined;
      $pending.set(false);
      callback();
    }, delay);
  };

  const stop = () => clear();

  const restart = () => start();

  scope.add(clear);

  return {
    start,
    stop,
    restart,
    pending: () => $pending.value(),
    $pending,
    dispose: () => scope.dispose(),
  };
};
