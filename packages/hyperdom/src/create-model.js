let modelDepth = 0;
/** Returns true while a `createModel(...)` factory is executing. */
export const isInModelContext = () => modelDepth > 0;
/**
 * Wraps a model factory to mark "model construction context".
 *
 * Useful for strict-mode checks and for debugging lifecycle boundaries.
 */
export const createModel = (factory, name) => {
    const make = () => {
        modelDepth++;
        try {
            return factory();
        }
        finally {
            modelDepth--;
        }
    };
    return Object.assign(make, { displayName: name });
};
//# sourceMappingURL=create-model.js.map