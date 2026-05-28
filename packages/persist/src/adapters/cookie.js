import { hasDocument, warnDev } from "../core/utils";
import { createMemoryStorageAdapter } from "./memory";
const encodeCookieValue = (value) => {
    return encodeURIComponent(value);
};
const decodeCookieValue = (value) => {
    return decodeURIComponent(value);
};
const readCookie = (key) => {
    if (!hasDocument()) {
        return null;
    }
    const doc = document;
    const prefix = `${encodeURIComponent(key)}=`;
    const parts = doc.cookie.split(";");
    for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.startsWith(prefix)) {
            return decodeCookieValue(trimmed.slice(prefix.length));
        }
    }
    return null;
};
const writeCookie = (key, value, options) => {
    if (!hasDocument()) {
        return;
    }
    const doc = document;
    const segments = [`${encodeURIComponent(key)}=${value == null ? "" : encodeCookieValue(value)}`];
    if (options.maxAge != null) {
        segments.push(`Max-Age=${options.maxAge}`);
    }
    if (options.path) {
        segments.push(`Path=${options.path}`);
    }
    if (options.domain) {
        segments.push(`Domain=${options.domain}`);
    }
    if (options.sameSite) {
        segments.push(`SameSite=${options.sameSite}`);
    }
    if (options.secure) {
        segments.push("Secure");
    }
    if (value == null) {
        segments.push("Max-Age=0");
    }
    doc.cookie = segments.join("; ");
};
export const createCookieStorageAdapter = (cookieOptions = {}) => {
    if (!hasDocument()) {
        warnDev("document.cookie is unavailable; falling back to in-memory storage.");
        return createMemoryStorageAdapter();
    }
    return {
        kind: "cookie",
        getItem(key) {
            return readCookie(key);
        },
        setItem(key, value) {
            writeCookie(key, value, cookieOptions);
        },
        removeItem(key) {
            writeCookie(key, null, cookieOptions);
        },
    };
};
//# sourceMappingURL=cookie.js.map