import type { Disposer } from "./internals/alien";
type CleanupFn = () => void;
export declare const __withCleanupBucket: <T>(bucket: CleanupFn[], fn: () => T) => T;
export declare const __runCleanupBucket: (bucket: CleanupFn[]) => void;
export declare const cleanup: (fn: CleanupFn) => void;
export declare const __wrapDisposerWithCleanup: (dispose: Disposer, bucket: CleanupFn[]) => Disposer;
export {};
//# sourceMappingURL=cleanup.d.ts.map