import { computed as alienComputed, effect as alienEffect, effectScope as alienEffectScope, endBatch as alienEndBatch, setActiveSub as alienSetActiveSub, signal as alienSignal, startBatch as alienStartBatch, } from "alien-signals";
export const createAlienSignal = (initial) => {
    return alienSignal(initial);
};
export const createAlienComputed = (getter) => {
    return alienComputed(getter);
};
export const createAlienEffect = (fn) => {
    return alienEffect(fn);
};
export const createAlienScope = (fn) => {
    return alienEffectScope(fn);
};
export const batch = (fn) => {
    alienStartBatch();
    try {
        return fn();
    }
    finally {
        alienEndBatch();
    }
};
export const untrack = (fn) => {
    const prev = alienSetActiveSub(undefined);
    try {
        return fn();
    }
    finally {
        alienSetActiveSub(prev);
    }
};
//# sourceMappingURL=alien.js.map