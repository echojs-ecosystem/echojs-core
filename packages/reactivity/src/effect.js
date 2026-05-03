import { isFunction } from "./utils";
import { createAlienEffect } from "./internals/alien";
export const effect = (fn) => {
    if (!isFunction(fn)) {
        throw new TypeError("effect(fn) expects a function");
    }
    return createAlienEffect(fn);
};
//# sourceMappingURL=effect.js.map