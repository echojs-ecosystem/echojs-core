import { freezeIfDev } from "./freeze";
import { createSubscribe } from "./subscribe";
import { createAlienSignal, untrack } from "./internals/alien";
import { brandReadonly, brandWritable } from "./internals/guards";
import { isFunction } from "./utils";
export const createReadonlySignalFacade = (impl) => {
    return brandReadonly({
        value: impl.value,
        peek: impl.peek,
        subscribe: impl.subscribe,
    });
};
const signalImpl = (...args) => {
    if (args.length === 0) {
        throw new TypeError("signal(initial) expects 1 argument");
    }
    const initial = args[0];
    const engine = createAlienSignal(freezeIfDev(initial));
    const readTracked = () => engine();
    const readUntracked = () => untrack(() => engine());
    const subscribe = createSubscribe(readTracked);
    const readonlyFacade = createReadonlySignalFacade({
        value: () => readTracked(),
        peek: () => readUntracked(),
        subscribe,
    });
    const writable = brandWritable({
        value: () => readTracked(),
        peek: () => readUntracked(),
        subscribe,
        set: (next) => {
            engine(freezeIfDev(next));
        },
        update: (fn) => {
            const prev = readUntracked();
            const next = fn(prev);
            engine(freezeIfDev(next));
        },
        readonly: () => readonlyFacade,
    });
    return writable;
};
export const signal = signalImpl;
//# sourceMappingURL=signal.js.map