import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultDocument, defaultWindow, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";

export interface KeyPressOptions {
  target?: Document | Window;
  /** Match event.code instead of event.key. */
  byCode?: boolean;
}

export const keyPress = (
  key: string,
  handler?: (event: KeyboardEvent) => void,
  options: KeyPressOptions = {},
) => {
  const { target, byCode = false } = options;
  const scope = createCleanupScope();
  const $pressed = signal(false);

  const matches = (event: KeyboardEvent) => {
    const wanted = key.toLowerCase();
    if (byCode) return event.code.toLowerCase() === wanted;
    return event.key.toLowerCase() === wanted || (wanted === "space" && event.key === " ");
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!matches(event)) return;
    $pressed.set(true);
    handler?.(event);
  };

  const onKeyUp = (event: KeyboardEvent) => {
    if (matches(event)) $pressed.set(false);
  };

  if (isClient) {
    const el = target ?? defaultDocument ?? defaultWindow;
    if (el) {
      scope.add(eventListener(el as Document, "keydown", onKeyDown).dispose);
      scope.add(eventListener(el as Document, "keyup", onKeyUp).dispose);
    }
  }

  return {
    pressed: () => $pressed.value(),
    $pressed,
    dispose: () => scope.dispose(),
  };
};
