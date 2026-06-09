import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultWindow, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";

export interface WindowSizeOptions {
  initialWidth?: number;
  initialHeight?: number;
  window?: Window;
}

export const windowSize = (options: WindowSizeOptions = {}) => {
  const { initialWidth = 0, initialHeight = 0 } = options;
  const win = "window" in options ? options.window : defaultWindow;
  const scope = createCleanupScope();

  const $width = signal(initialWidth);
  const $height = signal(initialHeight);

  const readSize = () => {
    if (!win) return;
    $width.set(win.innerWidth);
    $height.set(win.innerHeight);
  };

  if (isClient && win) {
    readSize();
    scope.add(eventListener(win, "resize", readSize).dispose);
  }

  return {
    width: () => $width.value(),
    height: () => $height.value(),
    $width,
    $height,
    dispose: () => scope.dispose(),
  };
};
