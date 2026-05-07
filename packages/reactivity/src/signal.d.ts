import type { ReadonlySignal, ReadValue, Signal } from "./types";
export declare const createReadonlySignalFacade: <T>(impl: {
    value(): ReadValue<T>;
    peek(): ReadValue<T>;
    subscribe(fn: () => void): () => void;
}) => ReadonlySignal<T>;
export declare const signal: <T>(initial: T) => Signal<T>;
//# sourceMappingURL=signal.d.ts.map