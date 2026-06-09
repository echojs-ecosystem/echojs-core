import { effect } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { isClient } from "../../core/env";
import { toValue } from "../../core/to-value";
import type { MaybeSignalOrGetter } from "../../core/types";

export type ResizeObserverTarget = Element | null | undefined;

export const resizeObserver = (
  target: MaybeSignalOrGetter<ResizeObserverTarget>,
  callback: ResizeObserverCallback,
) => {
  const scope = createCleanupScope();
  let observer: ResizeObserver | undefined;

  const observe = (el: ResizeObserverTarget) => {
    observer?.disconnect();
    observer = undefined;
    if (!isClient || !el || typeof ResizeObserver === "undefined") return;
    observer = new ResizeObserver(callback);
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
    dispose: () => scope.dispose(),
  };
};
