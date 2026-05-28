import type { UrlStateAdapter } from "../core/types";
import { createBrowserUrlStateAdapter } from "./browser-adapter";
import { createMemoryUrlStateAdapter } from "./memory-adapter";

export const getDefaultUrlStateAdapter = (): UrlStateAdapter => {
  if (typeof window !== "undefined" && typeof window.location !== "undefined") {
    return createBrowserUrlStateAdapter();
  }
  return createMemoryUrlStateAdapter("");
};

