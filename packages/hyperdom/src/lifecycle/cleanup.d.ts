export type CleanupFn = () => void;
export interface Scope {
    readonly cleanups: CleanupFn[];
    disposed: boolean;
}
/** Creates a fresh cleanup scope (used by render and dynamic regions). */
export declare const createScope: () => Scope;
/** Returns the scope currently active on this call stack (if any). */
export declare const getCurrentScope: () => Scope | null;
/**
 * Runs a function with `scope` set as current, restoring the previous scope afterwards.
 */
export declare const runWithScope: <T>(scope: Scope, fn: () => T) => T;
/** Registers a cleanup callback on the current scope (no-op if no active scope). */
export declare const onCleanup: (fn: CleanupFn) => void;
/** Disposes a scope, running cleanups in reverse order (best-effort). */
export declare const disposeScope: (scope: Scope) => void;
//# sourceMappingURL=cleanup.d.ts.map