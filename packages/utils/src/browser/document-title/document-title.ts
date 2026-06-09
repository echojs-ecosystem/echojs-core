import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultDocument, isClient } from "../../core/env";

export const documentTitle = (initialTitle = "") => {
  const scope = createCleanupScope();
  const previousTitle = isClient ? (defaultDocument?.title ?? "") : "";

  const $value = signal(isClient ? (defaultDocument?.title ?? initialTitle) : initialTitle);

  const apply = (title: string) => {
    $value.set(title);
    if (isClient && defaultDocument) {
      defaultDocument.title = title;
    }
  };

  if (initialTitle) {
    apply(initialTitle);
  }

  scope.add(() => {
    if (isClient && defaultDocument) {
      defaultDocument.title = previousTitle;
    }
  });

  return {
    value: () => $value.value(),
    set: apply,
    $value,
    dispose: () => scope.dispose(),
  };
};
