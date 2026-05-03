export type Disposer = () => void;
export declare const createAlienSignal: <T>(initial: T) => {
    (): T;
    (value: T): void;
};
export declare const createAlienComputed: <T>(getter: (prev?: T) => T) => () => T;
export declare const createAlienEffect: (fn: () => void) => Disposer;
export declare const createAlienScope: (fn: () => void) => Disposer;
export declare const batch: <T>(fn: () => T) => T;
export declare const untrack: <T>(fn: () => T) => T;
//# sourceMappingURL=alien.d.ts.map