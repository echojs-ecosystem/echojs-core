import { signal } from "@echojs-ecosystem/reactivity";

export interface CounterOptions {
  min?: number;
  max?: number;
}

export const counter = (initial = 0, options: CounterOptions = {}) => {
  const { min, max } = options;
  const initialValue = initial;
  const $value = signal(initial);

  const clamp = (next: number) => {
    let result = next;
    if (min !== undefined) result = Math.max(min, result);
    if (max !== undefined) result = Math.min(max, result);
    return result;
  };

  return {
    value: () => $value.value(),
    inc: (step = 1) => $value.update((v) => clamp(v + step)),
    dec: (step = 1) => $value.update((v) => clamp(v - step)),
    set: (next: number) => $value.set(clamp(next)),
    reset: () => $value.set(initialValue),
    $value,
    dispose: () => {},
  };
};
