import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultNavigator, defaultWindow, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";

export const online = () => {
  const scope = createCleanupScope();
  const $value = signal(isClient ? (defaultNavigator?.onLine ?? true) : true);

  if (isClient && defaultWindow) {
    scope.add(eventListener(defaultWindow, "online", () => $value.set(true)).dispose);
    scope.add(eventListener(defaultWindow, "offline", () => $value.set(false)).dispose);
  }

  return {
    value: () => $value.value(),
    $value,
    dispose: () => scope.dispose(),
  };
};
