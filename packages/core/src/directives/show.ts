import { effect, cleanup } from "@echojs/reactivity";
import type { ReadonlySignal, Signal } from "@echojs/reactivity";
import { isSignalish } from "../internals/utils";
import type { Signalish } from "../types";

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
