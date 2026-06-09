import { effect } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultDocument, isClient } from "../../core/env";
import { toValue } from "../../core/to-value";
import type { MaybeSignalOrGetter } from "../../core/types";

export type ClickOutsideTarget = HTMLElement | null | undefined;

export const clickOutside = (
  target: MaybeSignalOrGetter<ClickOutsideTarget>,
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  const scope = createCleanupScope();

  if (isClient && defaultDocument) {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = toValue(target);
      if (!el) return;
      const node = event.target as Node | null;
      if (node && !el.contains(node)) {
        handler(event);
      }
    };

    const stopEffect = effect(() => {
      toValue(target);
    });

    defaultDocument.addEventListener("mousedown", listener, true);
    defaultDocument.addEventListener("touchstart", listener, true);

    scope.add(() => {
      stopEffect();
      defaultDocument?.removeEventListener("mousedown", listener, true);
      defaultDocument?.removeEventListener("touchstart", listener, true);
    });
  }

  return {
    dispose: () => scope.dispose(),
  };
};
