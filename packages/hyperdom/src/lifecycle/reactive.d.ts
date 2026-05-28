/**
 * Registers a reactive effect in the current cleanup scope.
 *
 * Returns the disposer function (also registered with `onCleanup`).
 */
export declare const createReactiveEffect: (fn: () => void, onDispose?: () => void) => (() => void);
//# sourceMappingURL=reactive.d.ts.map