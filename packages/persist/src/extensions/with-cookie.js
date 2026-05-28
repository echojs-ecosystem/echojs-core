import { createCookieStorageAdapter } from "../adapters/cookie";
import { withStorage } from "../core/with-storage";
export const withCookie = (options) => {
    const { path, domain, sameSite, secure, maxAge, ...persistOptions } = options;
    const adapter = createCookieStorageAdapter({ path, domain, sameSite, secure, maxAge });
    return withStorage(adapter, persistOptions);
};
//# sourceMappingURL=with-cookie.js.map