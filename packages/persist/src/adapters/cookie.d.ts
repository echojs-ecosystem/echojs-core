import type { StorageAdapter } from "../core/types";
export type CookieAdapterOptions = {
    path?: string;
    domain?: string;
    sameSite?: "strict" | "lax" | "none";
    secure?: boolean;
    maxAge?: number;
};
export declare const createCookieStorageAdapter: (cookieOptions?: CookieAdapterOptions) => StorageAdapter;
//# sourceMappingURL=cookie.d.ts.map