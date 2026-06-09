import { effect, signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { isClient } from "../../core/env";
import { toValue } from "../../core/to-value";
import type { MaybeSignalOrGetter } from "../../core/types";

export type ElementTarget = HTMLElement | null | undefined;

const readSize = (el: ElementTarget) => {
  if (!el) return { width: 0, height: 0 };
  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
};

export const elementSize = (target: MaybeSignalOrGetter<ElementTarget>) => {
  const scope = createCleanupScope();
  const $width = signal(0);
  const $height = signal(0);

  let observer: ResizeObserver | undefined;

  const observe = (el: ElementTarget) => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
    const size = readSize(el);
    $width.set(size.width);
    $height.set(size.height);

    if (!isClient || !el || typeof ResizeObserver === "undefined") return;

    observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      $width.set(entry.contentRect.width);
      $height.set(entry.contentRect.height);
    });
    observer.observe(el);
  };

  const stopEffect = effect(() => {
    observe(toValue(target));
  });

  scope.add(() => {
    stopEffect();
    observer?.disconnect();
  });

  return {
    width: () => $width.value(),
    height: () => $height.value(),
    $width,
    $height,
    dispose: () => scope.dispose(),
  };
};
