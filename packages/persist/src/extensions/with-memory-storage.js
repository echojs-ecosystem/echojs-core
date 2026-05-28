import { createMemoryStorageAdapter } from "../adapters/memory";
import { withStorage } from "../core/with-storage";
export const withMemoryStorage = (options) => {
    const adapter = createMemoryStorageAdapter();
    return withStorage(adapter, options);
};
//# sourceMappingURL=with-memory-storage.js.map