import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultWindow, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";

export interface IdleOptions {
  /** Idle threshold in ms. Default `60_000`. */
  timeout?: number;
  /** Initial idle flag. Default `false`. */
  initial?: boolean;
}

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"] as const;

export const idle = (options: IdleOptions = {}) => {
  const { timeout = 60_000, initial = false } = options;
  const scope = createCleanupScope();
  const $idle = signal(initial);

  let timer: ReturnType<typeof setTimeout> | undefined;

  const reset = () => {
    $idle.set(false);
    if (timer) clearTimeout(timer);
    if (!isClient) return;
    timer = setTimeout(() => $idle.set(true), timeout);
  };

  if (isClient && defaultWindow) {
    reset();
    for (const event of ACTIVITY_EVENTS) {
      scope.add(
        eventListener(defaultWindow, event, reset, { passive: true }).dispose,
      );
    }
  }

  scope.add(() => {
    if (timer) clearTimeout(timer);
  });

  return {
    idle: () => $idle.value(),
    active: () => !$idle.value(),
    reset,
    $idle,
    dispose: () => scope.dispose(),
  };
};
