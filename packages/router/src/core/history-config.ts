import { createBrowserHistory } from "../histories/browser-history";
import { createHashHistory } from "../histories/hash-history";
import { createMemoryHistory } from "../histories/memory-history";
import type { RouterHistory } from "./types";

export type RouterHistoryKind = "browser" | "hash" | "memory";

export type MemoryHistoryConfig = {
  readonly type: "memory";
  readonly initial?: string;
};

export type RouterHistoryConfig = RouterHistoryKind | MemoryHistoryConfig | RouterHistory;

const isRouterHistory = (value: RouterHistoryConfig): value is RouterHistory =>
  typeof value === "object" && value !== null && "getLocation" in value && "push" in value;

export const resolveHistory = (config: RouterHistoryConfig): RouterHistory => {
  if (isRouterHistory(config)) {
    return config;
  }

  if (typeof config === "string") {
    switch (config) {
      case "browser":
        return createBrowserHistory();
      case "hash":
        return createHashHistory();
      case "memory":
        return createMemoryHistory("/");
      default: {
        const _exhaustive: never = config;
        throw new TypeError(`Unknown history kind: ${_exhaustive}`);
      }
    }
  }

  return createMemoryHistory(config.initial ?? "/");
};
