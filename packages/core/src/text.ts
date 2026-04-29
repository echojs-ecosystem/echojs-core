import { effect, cleanup } from "@echojs-ecosystem/reactivity";
import type { ReadonlySignal, Signal } from "@echojs-ecosystem/reactivity";
import { isSignalish, normalizeValue } from "./internals/utils.js";

export const createTextNode = (value: unknown): Text => {
  return document.createTextNode(normalizeValue(value));
};

export const createReactiveText = (
  value: Signal<unknown> | ReadonlySignal<unknown> | (() => unknown),
): Text => {
  const textNode = document.createTextNode("");

  const disposeFn = effect(() => {
    const resolvedValue: unknown = isSignalish(value)
      ? (value as Signal<unknown>).value()
      : (value as () => unknown)();
    textNode.nodeValue = normalizeValue(resolvedValue);
  });

  cleanup(disposeFn);

  return textNode;
};

export const setTextContent = (node: Text, value: unknown): void => {
  node.nodeValue = normalizeValue(value);
};
