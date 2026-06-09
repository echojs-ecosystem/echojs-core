import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultNavigator, isClient } from "../../core/env";

export type PermissionQueryState = PermissionState | "unsupported";

export const permission = (name: PermissionName) => {
  const scope = createCleanupScope();
  const $state = signal<PermissionQueryState>("prompt");
  const $supported = signal(false);

  if (isClient && defaultNavigator?.permissions) {
    let status: PermissionStatus | undefined;

    void defaultNavigator.permissions.query({ name }).then((result) => {
      status = result;
      $supported.set(true);
      $state.set(result.state);
      const onChange = () => $state.set(result.state);
      result.addEventListener("change", onChange);
      scope.add(() => result.removeEventListener("change", onChange));
    }).catch(() => {
      $supported.set(false);
      $state.set("unsupported");
    });

    scope.add(() => {
      status = undefined;
    });
  }

  return {
    state: () => $state.value(),
    supported: () => $supported.value(),
    $state,
    $supported,
    dispose: () => scope.dispose(),
  };
};
