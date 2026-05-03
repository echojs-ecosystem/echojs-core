import { isFunction } from "./utils";
import { batch as alienBatch } from "./internals/alien";
export const batch = (fn) => {
    if (!isFunction(fn)) {
        throw new TypeError("batch(fn) expects a function");
    }
    return alienBatch(fn);
};
//# sourceMappingURL=batch.js.map