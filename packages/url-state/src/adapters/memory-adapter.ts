import type { UrlStateAdapter } from "../core/types";
import { normalizeSearch } from "../core/url";

export const createMemoryUrlStateAdapter = (initialSearch: string = ""): UrlStateAdapter => {
  let search = normalizeSearch(initialSearch);
  const listeners = new Set<() => void>();

  return {
    kind: "memory",
    getSearch() {
      return search;
    },
    setSearch(next) {
      const normalized = normalizeSearch(next);
      if (normalized === search) return;
      search = normalized;
      for (const listener of listeners) listener();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

