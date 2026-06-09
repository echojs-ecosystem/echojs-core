import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultDocument, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";
import { toValue } from "../../core/to-value";
import type { MaybeSignalOrGetter } from "../../core/types";

export type FullscreenTarget = Element | null | undefined;

export const fullscreen = (target: MaybeSignalOrGetter<FullscreenTarget> = null) => {
  const scope = createCleanupScope();
  const $isFullscreen = signal(false);

  const sync = () => {
    if (!defaultDocument) return;
    $isFullscreen.set(!!defaultDocument.fullscreenElement);
  };

  if (isClient && defaultDocument) {
    sync();
    scope.add(eventListener(defaultDocument, "fullscreenchange", sync).dispose);
  }

  const resolveTarget = () => toValue(target) ?? defaultDocument?.documentElement ?? null;

  const enter = async () => {
    const el = resolveTarget();
    if (!isClient || !el?.requestFullscreen) return;
    await el.requestFullscreen();
    sync();
  };

  const exit = async () => {
    if (!isClient || !defaultDocument?.fullscreenElement) return;
    await defaultDocument.exitFullscreen();
    sync();
  };

  const toggle = async () => {
    if ($isFullscreen.value()) await exit();
    else await enter();
  };

  return {
    isFullscreen: () => $isFullscreen.value(),
    $isFullscreen,
    enter,
    exit,
    toggle,
    dispose: () => scope.dispose(),
  };
};
