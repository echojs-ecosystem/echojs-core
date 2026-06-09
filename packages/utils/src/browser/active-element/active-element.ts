import { signal, type ReadonlySignal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultDocument, isClient } from "../../core/env";
import { eventListener } from "../../core/event-listener";

export interface ActiveElementResult {
  value: () => Element | null;
  $value: ReadonlySignal<Element | null>;
  dispose: () => void;
}

export const activeElement = (): ActiveElementResult => {
  const scope = createCleanupScope();
  const $value = signal<Element | null>(
    isClient ? ((defaultDocument?.activeElement ?? null) as Element | null) : null,
  );

  if (isClient && defaultDocument) {
    const sync = () =>
      $value.set(defaultDocument!.activeElement as Element | null);
    sync();
    scope.add(eventListener(defaultDocument, "focusin", sync, true).dispose);
    scope.add(eventListener(defaultDocument, "focusout", sync, true).dispose);
  }

  return {
    value: (): Element | null => $value.peek() as Element | null,
    $value: $value as ReadonlySignal<Element | null>,
    dispose: () => scope.dispose(),
  };
};
