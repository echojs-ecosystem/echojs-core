import { effect, cleanup } from "@echojs-ecosystem/reactivity";
import type { ReadonlySignal, Signal } from "@echojs-ecosystem/reactivity";
import { isSignalish } from "../internals/utils.js";
import type { Signalish } from "../types.js";

export const applyShowDirective = (element: HTMLElement, condition: Signalish<boolean>): void => {
  if (isSignalish(condition)) {
    const dispose = effect(() => {
      const show = (condition as Signal<boolean>).value();
      element.style.display = show ? "" : "none";
    });
    cleanup(dispose);
  } else {
    element.style.display = condition ? "" : "none";
  }
};

export const showDirective = (element: HTMLElement, value: Signalish<boolean>): void => {
  applyShowDirective(element, value);
};
