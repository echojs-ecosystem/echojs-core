import { effect, signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";
import { toValue } from "../../core/to-value";
import type { MaybeSignalOrGetter } from "../../core/types";

export type FocusTarget = HTMLElement | null | undefined;

export const focus = (target: MaybeSignalOrGetter<FocusTarget>) => {
  const scope = createCleanupScope();
  const $focused = signal(false);

  let detach: (() => void) | undefined;

  const attach = (el: FocusTarget) => {
    detach?.();
    detach = undefined;
    $focused.set(false);
    if (!isClient || !el) return;

    const onFocus = () => $focused.set(true);
    const onBlur = () => $focused.set(false);
    const focusIn = eventListener(el, "focusin", onFocus);
    const focusOut = eventListener(el, "focusout", onBlur);
    detach = () => {
      focusIn.dispose();
      focusOut.dispose();
    };
  };

  const stopEffect = effect(() => {
    attach(toValue(target));
  });

  scope.add(() => {
    stopEffect();
    detach?.();
  });

  return {
    focused: () => $focused.value(),
    $focused,
    focus: () => {
      const el = toValue(target);
      el?.focus();
    },
    blur: () => {
      const el = toValue(target);
      el?.blur();
    },
    dispose: () => scope.dispose(),
  };
};
