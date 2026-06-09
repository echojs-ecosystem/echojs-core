import { signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultNavigator, isClient } from "../../core/env";

export const clipboard = () => {
  const scope = createCleanupScope();

  const $text = signal("");
  const $copied = signal(false);
  const $error = signal<unknown>(null);

  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  const copy = async (text: string) => {
    $copied.set(false);
    $error.set(null);

    if (!isClient || !defaultNavigator?.clipboard) {
      const err = new Error("Clipboard API is not available");
      $error.set(err);
      throw err;
    }

    try {
      await defaultNavigator.clipboard.writeText(text);
      $text.set(text);
      $copied.set(true);
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => $copied.set(false), 2000);
    } catch (error) {
      $error.set(error);
      $copied.set(false);
      throw error;
    }
  };

  scope.add(() => {
    if (resetTimer) clearTimeout(resetTimer);
  });

  return {
    copy,
    text: () => $text.value(),
    copied: () => $copied.value(),
    error: () => $error.value(),
    $text,
    $copied,
    $error,
    dispose: () => scope.dispose(),
  };
};
