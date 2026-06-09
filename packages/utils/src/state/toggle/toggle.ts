import { signal } from "@echojs-ecosystem/reactivity";

export const toggle = (initial = false) => {
  const $value = signal(initial);

  return {
    value: () => $value.value(),
    on: () => $value.set(true),
    off: () => $value.set(false),
    toggle: () => $value.update((v) => !v),
    set: (next: boolean) => $value.set(next),
    $value,
    dispose: () => {},
  };
};
