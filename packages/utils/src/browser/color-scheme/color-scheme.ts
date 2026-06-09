import { computed, signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultDocument, defaultWindow, isClient } from "../../core/env";
import type { ColorSchemePreference } from "../../core/types";

const getSystemScheme = (): "light" | "dark" => {
  if (!isClient || !defaultWindow) return "light";
  return defaultWindow.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyDocumentScheme = (scheme: "light" | "dark") => {
  if (!isClient || !defaultDocument?.documentElement) return;
  defaultDocument.documentElement.dataset.colorScheme = scheme;
  defaultDocument.documentElement.style.colorScheme = scheme;
};

export const colorScheme = (initial: ColorSchemePreference = "auto") => {
  const scope = createCleanupScope();
  const $preference = signal<ColorSchemePreference>(initial);

  const $resolved = computed(() => {
    const pref = $preference.value();
    return pref === "auto" ? getSystemScheme() : pref;
  });

  const sync = () => applyDocumentScheme($resolved.value());

  if (isClient && defaultWindow) {
    sync();
    const mql = defaultWindow.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if ($preference.value() === "auto") sync();
    };
    mql.addEventListener("change", listener);
    scope.add(() => mql.removeEventListener("change", listener));
  }

  const set = (next: ColorSchemePreference) => {
    $preference.set(next);
    sync();
  };

  const toggle = () => {
    const resolved = $resolved.value();
    set(resolved === "dark" ? "light" : "dark");
  };

  return {
    value: () => $resolved.value(),
    preference: () => $preference.value(),
    set,
    toggle,
    $value: $resolved,
    $preference,
    dispose: () => scope.dispose(),
  };
};
