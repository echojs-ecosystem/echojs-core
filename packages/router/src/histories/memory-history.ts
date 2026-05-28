import type { RouterHistory } from "../core/types";
import { splitLocation } from "../core/path";

export const createMemoryHistory = (initialPath = "/"): RouterHistory => {
  let index = 0;
  const stack: string[] = [initialPath];
  const listeners = new Set<(path: string) => void>();

  const notify = (): void => {
    const path = stack[index]!;
    for (const listener of listeners) {
      listener(path);
    }
  };

  const getLocation = (): string => stack[index]!;

  return {
    getLocation,
    push(path: string) {
      stack.splice(index + 1);
      stack.push(path);
      index = stack.length - 1;
      notify();
    },
    replace(path: string) {
      stack[index] = path;
      notify();
    },
    listen(callback: (path: string) => void) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    back() {
      if (index <= 0) return;
      index -= 1;
      notify();
    },
    forward() {
      if (index >= stack.length - 1) return;
      index += 1;
      notify();
    },
  };
};

export const memoryHistoryPathname = (location: string): string =>
  splitLocation(location).pathname;
