import { effect, signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";
import { toValue } from "../../core/to-value";
import type { MaybeSignalOrGetter } from "../../core/types";

export type HoverTarget = HTMLElement | null | undefined;

export const hover = (target: MaybeSignalOrGetter<HoverTarget>) => {
  const scope = createCleanupScope();
  const $value = signal(false);

  let detach: (() => void) | undefined;

  const attach = (el: HoverTarget) => {
    detach?.();
    detach = undefined;
    $value.set(false);
    if (!isClient || !el) return;

    const enter = eventListener(el, "mouseenter", () => $value.set(true));
    const leave = eventListener(el, "mouseleave", () => $value.set(false));
    detach = () => {
      enter.dispose();
      leave.dispose();
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
    value: () => $value.value(),
    $value,
    dispose: () => scope.dispose(),
  };
};
