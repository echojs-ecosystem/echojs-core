import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultWindow, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";

export interface DevicePixelRatioOptions {
  window?: Window;
  initial?: number;
}

export const devicePixelRatio = (options: DevicePixelRatioOptions = {}) => {
  const { window: win = defaultWindow, initial = 1 } = options;
  const scope = createCleanupScope();

  const $value = signal(isClient && win ? win.devicePixelRatio : initial);

  if (isClient && win) {
    const sync = () => $value.set(win.devicePixelRatio);
    sync();
    scope.add(eventListener(win, "resize", sync).dispose);
  }

  return {
    value: () => $value.value(),
    $value,
    dispose: () => scope.dispose(),
  };
};
