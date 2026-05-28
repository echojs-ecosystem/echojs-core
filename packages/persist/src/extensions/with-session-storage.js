import { createSessionStorageAdapter } from "../adapters/session-storage";
import { withStorage } from "../core/with-storage";
export const withSessionStorage = (options) => {
    const adapter = createSessionStorageAdapter();
    return withStorage(adapter, options);
};
//# sourceMappingURL=with-session-storage.js.map