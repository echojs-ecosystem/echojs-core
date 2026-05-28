import type { UrlStateAdapter } from "../core/types";
import { normalizeSearch } from "../core/url";

export type RouterLike = {
  readonly $fullPath: { value(): string; subscribe(fn: () => void): () => void };
  go(path: string, options?: { replace?: boolean }): void;
  replace?(path: string): void;
};

const splitFullPath = (
  fullPath: string,
): {
  pathname: string;
  search: string;
  hash: string;
} => {
  const hashIndex = fullPath.indexOf("#");
  const beforeHash = hashIndex >= 0 ? fullPath.slice(0, hashIndex) : fullPath;
  const hash = hashIndex >= 0 ? fullPath.slice(hashIndex) : "";

  const qIndex = beforeHash.indexOf("?");
  const pathname = qIndex >= 0 ? beforeHash.slice(0, qIndex) : beforeHash;
  const search = qIndex >= 0 ? beforeHash.slice(qIndex) : "";
  return { pathname: pathname || "/", search: normalizeSearch(search), hash };
};

export const createRouterUrlStateAdapter = (router: RouterLike): UrlStateAdapter | undefined => {
  if (!router) return undefined;
  return {
    kind: "router",
    getSearch() {
      const { search } = splitFullPath(router.$fullPath.value());
      return search;
    },
    setSearch(search, options) {
      const { pathname, hash } = splitFullPath(router.$fullPath.value());
      const normalized = normalizeSearch(search);
      const next = `${pathname}${normalized}${hash}`;

      const historyMode = options?.history ?? "replace";
      if (historyMode === "replace" && router.replace) router.replace(next);
      else router.go(next, { replace: historyMode === "replace" });
    },
    subscribe(listener) {
      return router.$fullPath.subscribe(listener);
    },
  };
};

