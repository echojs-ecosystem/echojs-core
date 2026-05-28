import { createPersist } from "./persist";
export const withStorage = (adapter, options) => {
    return (target) => {
        const persist = createPersist(target, adapter, options);
        if (options.hydrate !== false) {
            void persist.hydrate();
        }
        return { persist };
    };
};
//# sourceMappingURL=with-storage.js.map