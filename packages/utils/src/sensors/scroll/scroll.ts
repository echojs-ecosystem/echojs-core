import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultWindow, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";
import { toValue } from "../../core/to-value";
import type { MaybeSignalOrGetter } from "../../core/types";

export type ScrollTarget = Window | HTMLElement | Document | null | undefined;

export interface ScrollOptions {
  idleTimeout?: number;
}

const getScrollPosition = (target: ScrollTarget) => {
  if (!target) return { x: 0, y: 0 };
  if (target === defaultWindow || target instanceof Window) {
    return {
      x: target.scrollX ?? target.pageXOffset ?? 0,
      y: target.scrollY ?? target.pageYOffset ?? 0,
    };
  }
  if (target instanceof Document) {
    const el = target.documentElement;
    return { x: el.scrollLeft, y: el.scrollTop };
  }
  return { x: target.scrollLeft, y: target.scrollTop };
};

export const scroll = (
  target: MaybeSignalOrGetter<ScrollTarget> = defaultWindow,
  options: ScrollOptions = {},
) => {
  const { idleTimeout = 150 } = options;
  const scope = createCleanupScope();

  const $x = signal(0);
  const $y = signal(0);
  const $isScrolling = signal(false);

  let idleTimer: ReturnType<typeof setTimeout> | undefined;

  const readScroll = () => {
    const el = toValue(target);
    const pos = getScrollPosition(el);
    $x.set(pos.x);
    $y.set(pos.y);
  };

  const onScroll = () => {
    readScroll();
    $isScrolling.set(true);
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => $isScrolling.set(false), idleTimeout);
  };

  if (isClient) {
    const resolved = toValue(target) ?? defaultWindow;
    readScroll();
    if (resolved) {
      scope.add(eventListener(resolved as Window, "scroll", onScroll, { passive: true }).dispose);
    }
  }

  scope.add(() => {
    if (idleTimer) clearTimeout(idleTimer);
  });

  return {
    x: () => $x.value(),
    y: () => $y.value(),
    isScrolling: () => $isScrolling.value(),
    $x,
    $y,
    $isScrolling,
    dispose: () => scope.dispose(),
  };
};
