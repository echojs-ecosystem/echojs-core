import { createCleanupScope } from "../../core/cleanup";
import { defaultDocument, defaultWindow, isClient } from "../../core/env";
import { matchHotkey, parseHotkey } from "../../core/hotkey";
import { eventListener } from "../../core/event-listener";

export interface HotkeysOptions {
  /** Prevent default when hotkey matches. Default `false`. */
  preventDefault?: boolean;
  /** Event target. Default `document` or `window`. */
  target?: Document | Window;
}

export const hotkeys = (
  keys: string | string[],
  handler: (event: KeyboardEvent) => void,
  options: HotkeysOptions = {},
) => {
  const { preventDefault = false, target } = options;
  const scope = createCleanupScope();
  const parsed = (Array.isArray(keys) ? keys : [keys]).map(parseHotkey);

  const listener = (event: KeyboardEvent) => {
    if (parsed.some((combo) => matchHotkey(event, combo))) {
      if (preventDefault) event.preventDefault();
      handler(event);
    }
  };

  if (isClient) {
    const el = target ?? defaultDocument ?? defaultWindow;
    if (el) {
      scope.add(eventListener(el as Document, "keydown", listener).dispose);
    }
  }

  return {
    dispose: () => scope.dispose(),
  };
};
