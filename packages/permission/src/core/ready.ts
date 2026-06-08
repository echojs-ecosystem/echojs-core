import type { Signal } from "@echojs-ecosystem/reactivity";

export type ReadyState = {
  $ready: Signal<boolean>;
  isReady(): boolean;
  setReady(value: boolean): void;
};

export const createReadyState = (
  $ready: Signal<boolean>,
  onChange: () => void,
): ReadyState => {
  return {
    $ready,
    isReady() {
      return $ready.peek();
    },
    setReady(value) {
      if ($ready.peek() === value) {
        return;
      }

      $ready.set(value);
      onChange();
    },
  };
};
