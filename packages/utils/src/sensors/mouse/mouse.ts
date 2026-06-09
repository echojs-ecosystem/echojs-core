import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultDocument, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";
import type { MouseSourceType } from "../../core/types";

export interface MouseOptions {
  document?: Document;
}

export const mouse = (options: MouseOptions = {}) => {
  const { document: doc = defaultDocument } = options;
  const scope = createCleanupScope();

  const $x = signal(0);
  const $y = signal(0);
  const $sourceType = signal<MouseSourceType>(null);

  const updateFromEvent = (event: MouseEvent | TouchEvent) => {
    if ("touches" in event && event.touches[0]) {
      $x.set(event.touches[0].clientX);
      $y.set(event.touches[0].clientY);
      $sourceType.set("touch");
      return;
    }
    const mouse = event as MouseEvent;
    $x.set(mouse.clientX);
    $y.set(mouse.clientY);
    const pointerType = (mouse as PointerEvent).pointerType;
    $sourceType.set(pointerType === "pen" ? "pen" : "mouse");
  };

  if (isClient && doc) {
    scope.add(eventListener(doc, "mousemove", updateFromEvent).dispose);
    scope.add(eventListener(doc, "touchmove", updateFromEvent, { passive: true }).dispose);
  }

  return {
    x: () => $x.value(),
    y: () => $y.value(),
    sourceType: () => $sourceType.value(),
    $x,
    $y,
    $sourceType,
    dispose: () => scope.dispose(),
  };
};
