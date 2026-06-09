import { effect, signal } from "@echojs-ecosystem/reactivity";

import { createCleanupScope } from "../../core/cleanup";
import { defaultDocument, isClient } from "../../core/env";
import { toValue } from "../../core/to-value";
import type { MaybeSignalOrGetter } from "../../core/types";

export type CssVarTarget = HTMLElement | null | undefined;

const readVar = (name: string, el: CssVarTarget) => {
  const root = el ?? defaultDocument?.documentElement;
  if (!root) return "";
  return getComputedStyle(root).getPropertyValue(name).trim();
};

export const cssVar = (
  name: string,
  target: MaybeSignalOrGetter<CssVarTarget> = null,
  initial = "",
) => {
  const scope = createCleanupScope();
  const varName = name.startsWith("--") ? name : `--${name}`;

  const $value = signal(initial);

  const sync = () => {
    if (!isClient) return;
    $value.set(readVar(varName, toValue(target)));
  };

  const stopEffect = effect(() => {
    toValue(target);
    sync();
  });

  const set = (next: string) => {
    const el = toValue(target) ?? defaultDocument?.documentElement;
    if (isClient && el) {
      el.style.setProperty(varName, next);
    }
    $value.set(next);
  };

  scope.add(() => {
    stopEffect();
  });

  if (isClient) sync();

  return {
    value: () => $value.value(),
    set,
    refresh: sync,
    $value,
    dispose: () => scope.dispose(),
  };
};
