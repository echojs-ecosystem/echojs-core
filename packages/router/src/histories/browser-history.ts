import { joinLocation, splitLocation } from "../core/path";
import type { RouterHistory } from "../core/types";

const readLocation = (): string => {
  const { pathname, search } = window.location;
  return joinLocation(pathname, search);
};

export const createBrowserHistory = (): RouterHistory => {
  const listeners = new Set<(path: string) => void>();

  const notify = (): void => {
    const path = readLocation();
    for (const listener of listeners) {
      listener(path);
    }
  };

  const onPopState = (): void => notify();

  return {
    getLocation: readLocation,
    push(path: string) {
      const { pathname, search } = splitLocation(path);
      window.history.pushState(null, "", joinLocation(pathname, search));
      notify();
    },
    replace(path: string) {
      const { pathname, search } = splitLocation(path);
      window.history.replaceState(null, "", joinLocation(pathname, search));
      notify();
    },
    listen(callback: (path: string) => void) {
      listeners.add(callback);
      window.addEventListener("popstate", onPopState);
      return () => {
        listeners.delete(callback);
        window.removeEventListener("popstate", onPopState);
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
