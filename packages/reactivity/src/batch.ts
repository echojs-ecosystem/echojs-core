import { isFunction } from "./utils";
import { batch as alienBatch } from "./internals/alien.js";

export const batch = <T>(fn: () => T): T => {
  if (!isFunction(fn)) {
    throw new TypeError("batch(fn) expects a function");
  }
  return alienBatch(fn);
};
