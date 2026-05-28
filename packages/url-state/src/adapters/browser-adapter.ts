import type { UrlStateAdapter } from "../core/types";
import { normalizeSearch } from "../core/url";

export const createBrowserUrlStateAdapter = (): UrlStateAdapter => {
  if (typeof window === "undefined" || typeof window.history === "undefined" || typeof window.location === "undefined") {
    throw new Error("@echojs/url-state: Browser adapter requires `window`");
  }

  const listeners = new Set<() => void>();

  const notify = (): void => {
    for (const listener of listeners) listener();
  };

  window.addEventListener("popstate", notify);

  return {
    kind: "browser",
    getSearch() {
      return normalizeSearch(window.location.search);
    },
    setSearch(search, options) {
      const normalized = normalizeSearch(search);
      const pathname = window.location.pathname;
      const hash = window.location.hash ?? "";
      const nextUrl = `${pathname}${normalized}${hash}`;
      const historyMode = options?.history ?? "replace";
      if (historyMode === "push") window.history.pushState({}, "", nextUrl);
      else window.history.replaceState({}, "", nextUrl);
      notify();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          // Keep it simple for now; browser adapter is usually global/singleton.
        }
      };
    },
  };
};

