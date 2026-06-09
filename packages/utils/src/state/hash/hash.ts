import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultWindow, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";

const readHash = (win: Window | undefined) => {
  if (!win) return "";
  const hash = win.location.hash;
  return hash.startsWith("#") ? hash.slice(1) : hash;
};

export const hash = (initial = "") => {
  const scope = createCleanupScope();
  const win = defaultWindow;

  const $value = signal(isClient ? readHash(win) : initial);

  const set = (next: string) => {
    const normalized = next.startsWith("#") ? next.slice(1) : next;
    $value.set(normalized);
    if (isClient && win) {
      win.location.hash = normalized;
    }
  };

  if (isClient && win) {
    const sync = () => $value.set(readHash(win));
    scope.add(eventListener(win, "hashchange", sync).dispose);
  }

  return {
    value: () => $value.value(),
    set,
    $value,
    dispose: () => scope.dispose(),
  };
};
