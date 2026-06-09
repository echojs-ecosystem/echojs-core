import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultWindow, isClient } from "../../core/env";

export interface MediaQueryOptions {
  window?: Window;
}

export const mediaQuery = (query: string, options: MediaQueryOptions = {}) => {
  const { window: win = defaultWindow } = options;
  const scope = createCleanupScope();

  const $matches = signal(false);

  if (isClient && win) {
    const mql = win.matchMedia(query);
    const update = () => $matches.set(mql.matches);
    update();

    const listener = (event: MediaQueryListEvent) => $matches.set(event.matches);
    mql.addEventListener("change", listener);
    scope.add(() => mql.removeEventListener("change", listener));
  }

  return {
    matches: () => $matches.value(),
    $matches,
    dispose: () => scope.dispose(),
  };
};
