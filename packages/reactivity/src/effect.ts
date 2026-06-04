import { isFunction } from "./utils";
import { createAlienEffect } from "./internals/alien.js";

export const effect = (fn: () => void): (() => void) => {
  if (!isFunction(fn)) {
    throw new TypeError("effect(fn) expects a function");
  }
  return createAlienEffect(fn);
};
