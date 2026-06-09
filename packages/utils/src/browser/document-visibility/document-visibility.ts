import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultDocument, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";

export type DocumentVisibilityState = Document["visibilityState"];

export const documentVisibility = () => {
  const scope = createCleanupScope();
  const initial: DocumentVisibilityState = isClient
    ? (defaultDocument?.visibilityState ?? "visible")
    : "visible";

  const $value = signal<DocumentVisibilityState>(initial);

  if (isClient && defaultDocument) {
    const sync = () => $value.set(defaultDocument!.visibilityState);
    sync();
    scope.add(eventListener(defaultDocument, "visibilitychange", sync).dispose);
  }

  return {
    value: () => $value.value(),
    hidden: () => $value.value() === "hidden",
    visible: () => $value.value() === "visible",
    $value,
    dispose: () => scope.dispose(),
  };
};
