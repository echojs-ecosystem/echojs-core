import { effect } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "./cleanup";
import { isClient } from "./env";
import { toValue } from "./to-value";
import type { MaybeEventTarget } from "./types";

type ListenerOptions = boolean | AddEventListenerOptions;

const resolveTarget = (target: MaybeEventTarget): EventTarget | null | undefined => {
  const resolved = toValue(target);
  if (resolved == null) return resolved;
  if (typeof resolved === "function") {
    return (resolved as () => EventTarget | null | undefined)();
  }
  return resolved;
};

/**
 * Low-level event listener helper with automatic target resolution and dispose.
 * No-op on the server.
 */
export function eventListener<E extends Event>(
  target: MaybeEventTarget,
  event: string,
  handler: (event: E) => void,
  options?: ListenerOptions,
): { dispose: () => void } {
  const scope = createCleanupScope();

  if (!isClient) {
    return { dispose: () => scope.dispose() };
  }

  let attachedTarget: EventTarget | null | undefined;
  const attachedHandler = handler as EventListenerOrEventListenerObject;

  const attach = (el: EventTarget | null | undefined) => {
    if (attachedTarget) {
      attachedTarget.removeEventListener(event, attachedHandler, options);
    }
    attachedTarget = el ?? null;
    if (attachedTarget) {
      attachedTarget.addEventListener(event, attachedHandler, options);
    }
  };

  const isReactiveTarget =
    typeof target === "function" ||
    (typeof target === "object" && target !== null && "value" in target);

  if (isReactiveTarget) {
    const stopEffect = effect(() => {
      attach(resolveTarget(target));
    });
    scope.add(stopEffect);
  } else {
    attach(resolveTarget(target));
  }

  scope.add(() => {
    if (attachedTarget) {
      attachedTarget.removeEventListener(event, attachedHandler, options);
      attachedTarget = null;
    }
  });

  return { dispose: () => scope.dispose() };
}
