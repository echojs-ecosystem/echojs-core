import { createLocalStorageAdapter } from "../adapters/local-storage";
import { withStorage } from "../core/with-storage";
export const withLocalStorage = (options) => {
    const adapter = createLocalStorageAdapter();
    return withStorage(adapter, options);
};
//# sourceMappingURL=with-local-storage.js.map