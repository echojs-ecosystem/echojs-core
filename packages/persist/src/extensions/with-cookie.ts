import { createCookieStorageAdapter } from "../adapters/cookie";
import { withStorage } from "../core/with-storage";
import type { CookiePersistOptions, PersistExtension } from "../core/types";

export const withCookie = <Value, Snapshot = Value>(
  options: CookiePersistOptions<Value, Snapshot>,
): PersistExtension<Value, Snapshot> => {
  const { path, domain, sameSite, secure, maxAge, ...persistOptions } = options;
  const adapter = createCookieStorageAdapter({ path, domain, sameSite, secure, maxAge });
  return withStorage(adapter, persistOptions);
};
