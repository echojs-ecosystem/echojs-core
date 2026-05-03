import { isObjectLike } from "./utils";
const DEV = (() => {
    const env = globalThis?.process?.env;
    const nodeEnv = env?.NODE_ENV;
    return nodeEnv !== "production";
})();
const deepFreezeImpl = (value, seen) => {
    if (!isObjectLike(value))
        return;
    if (Object.isFrozen(value))
        return;
    if (seen.has(value))
        return;
    seen.add(value);
    const keys = Object.keys(value);
    for (const k of keys) {
        deepFreezeImpl(value[k], seen);
    }
    Object.freeze(value);
};
export const freezeIfDev = (value) => {
    if (!DEV)
        return value;
    if (!isObjectLike(value))
        return value;
    deepFreezeImpl(value, new WeakSet());
    return value;
};
export const __isDevModeForTests = () => {
    return DEV;
};
//# sourceMappingURL=freeze.js.map