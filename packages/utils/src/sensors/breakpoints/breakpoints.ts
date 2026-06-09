import { computed, signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultWindow, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";

export type BreakpointsMap = Record<string, number>;

export interface BreakpointsOptions {
  breakpoints?: BreakpointsMap;
  window?: Window;
}

const DEFAULT_BREAKPOINTS: BreakpointsMap = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const sortBreakpoints = (breakpoints: BreakpointsMap) =>
  Object.entries(breakpoints).sort(([, a], [, b]) => a - b);

export const breakpoints = (options: BreakpointsOptions = {}) => {
  const { breakpoints = DEFAULT_BREAKPOINTS, window: win = defaultWindow } = options;
  const scope = createCleanupScope();
  const sorted = sortBreakpoints(breakpoints);

  const $width = signal(0);

  const readWidth = () => {
    if (!win) return;
    $width.set(win.innerWidth);
  };

  if (isClient && win) {
    readWidth();
    scope.add(eventListener(win, "resize", readWidth).dispose);
  }

  const $current = computed(() => {
    const width = $width.value();
    let current = sorted[0]?.[0] ?? "";
    for (const [name, min] of sorted) {
      if (width >= min) current = name;
    }
    return current;
  });

  const greaterOrEqual = (name: string) => {
    const min = breakpoints[name];
    if (min === undefined) return false;
    return $width.value() >= min;
  };

  const smaller = (name: string) => {
    const min = breakpoints[name];
    if (min === undefined) return false;
    return $width.value() < min;
  };

  return {
    current: () => $current.value(),
    $current,
    greaterOrEqual,
    smaller,
    dispose: () => scope.dispose(),
  };
};
