import { normalizePathname } from "../core/path";
import type { RouterHistory } from "../core/types";

const readHashPath = (): string => {
  const hash = window.location.hash;
  if (!hash || hash === "#") return "/";
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return normalizePathname(path);
};

export const createHashHistory = (): RouterHistory => {
  const listeners = new Set<(path: string) => void>();

  const notify = (): void => {
    const path = readHashPath();
    for (const listener of listeners) {
      listener(path);
    }
  };

  const onHashChange = (): void => notify();

  const writeHash = (path: string, replace: boolean): void => {
    const normalized = normalizePathname(path);
    const next = `#${normalized}`;
    if (replace) window.location.replace(next);
    else window.location.hash = next;
    notify();
  };

  return {
    getLocation: readHashPath,
    push(path: string) {
      writeHash(path, false);
    },
    replace(path: string) {
      writeHash(path, true);
    },
    listen(callback: (path: string) => void) {
      listeners.add(callback);
      window.addEventListener("hashchange", onHashChange);
      return () => {
        listeners.delete(callback);
        window.removeEventListener("hashchange", onHashChange);
      };
    },
    back() {
      window.history.back();
    },
    forward() {
      window.history.forward();
    },
  };
};
