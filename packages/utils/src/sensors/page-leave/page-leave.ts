import { createCleanupScope } from "../../core/cleanup";
import { defaultDocument, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";

export const pageLeave = (handler: () => void) => {
  const scope = createCleanupScope();

  if (isClient && defaultDocument) {
    const onLeave = () => handler();
    scope.add(eventListener(defaultDocument, "mouseleave", onLeave).dispose);
  }

  return {
    dispose: () => scope.dispose(),
  };
};
