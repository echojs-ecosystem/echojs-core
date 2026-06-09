import { effect, signal, type ReadonlySignal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { isClient } from "../../core/env";
import { toValue } from "../../core/to-value";
import type { MaybeSignalOrGetter } from "../../core/types";

export type IntersectionTarget = Element | null | undefined;

export interface UseIntersectionObserverResult {
  isIntersecting: () => boolean;
  entry: () => IntersectionObserverEntry | null;
  $isIntersecting: ReadonlySignal<boolean>;
  $entry: ReadonlySignal<IntersectionObserverEntry | null>;
  dispose: () => void;
}

export const intersectionObserver = (
  target: MaybeSignalOrGetter<IntersectionTarget>,
  options?: IntersectionObserverInit,
): UseIntersectionObserverResult => {
  const scope = createCleanupScope();
  const $isIntersecting = signal(false);
  const $entry = signal<IntersectionObserverEntry | null>(null);

  let observer: IntersectionObserver | undefined;

  const observe = (el: IntersectionTarget) => {
    observer?.disconnect();
    observer = undefined;
    $isIntersecting.set(false);
    $entry.set(null);

    if (!isClient || !el || typeof IntersectionObserver === "undefined") return;

    observer = new IntersectionObserver((entries) => {
      const entry = entries[0] ?? null;
      $entry.set(entry);
      $isIntersecting.set(entry?.isIntersecting ?? false);
    }, options);
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
    isIntersecting: () => $isIntersecting.value(),
    entry: (): IntersectionObserverEntry | null =>
      $entry.peek() as IntersectionObserverEntry | null,
    $isIntersecting,
    $entry: $entry as ReadonlySignal<IntersectionObserverEntry | null>,
    dispose: () => scope.dispose(),
  };
};
