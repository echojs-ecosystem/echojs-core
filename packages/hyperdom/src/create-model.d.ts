/** Returns true while a `createModel(...)` factory is executing. */
export declare const isInModelContext: () => boolean;
/**
 * Wraps a model factory to mark "model construction context".
 *
 * Useful for strict-mode checks and for debugging lifecycle boundaries.
 */
export declare const createModel: <VM>(factory: () => VM, name: string) => (() => VM);
//# sourceMappingURL=create-model.d.ts.map