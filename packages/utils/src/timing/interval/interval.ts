import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { isClient } from "../../core/env";

export const interval = (callback: () => void, delay: number) => {
  const scope = createCleanupScope();
  const $active = signal(false);

  let timer: ReturnType<typeof setInterval> | undefined;

  const stop = () => {
    if (timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
    $active.set(false);
  };

  const start = () => {
    stop();
    if (!isClient) return;
    $active.set(true);
    timer = setInterval(callback, delay);
  };

  scope.add(stop);

  return {
    start,
    stop,
    active: () => $active.value(),
    $active,
    dispose: () => scope.dispose(),
  };
};
