import type { UrlStateAdapter } from "../core/types";
import { getDefaultUrlStateAdapter } from "./adapter";
import { createRouterUrlStateAdapter } from "./router-adapter";
import { getUrlStateRouter, onUrlStateRouterReady } from "./router-registry";

/**
 * Uses the active router adapter when `createRouter` registered;
 * otherwise falls back to browser/memory (tests, SSR).
 */
export const createAutoRouterUrlStateAdapter = (): UrlStateAdapter => {
  const fallback = getDefaultUrlStateAdapter();

  const activeAdapter = (): UrlStateAdapter => {
    const router = getUrlStateRouter();
    if (router) return createRouterUrlStateAdapter(router)!;
    return fallback;
  };

  return {
    kind: "auto-router",
    getSearch: () => activeAdapter().getSearch(),
    setSearch: (search, options) => activeAdapter().setSearch(search, options),
    subscribe(listener) {
      let unsub = activeAdapter().subscribe(listener);

      const offReady = onUrlStateRouterReady(() => {
        unsub();
        listener();
        unsub = activeAdapter().subscribe(listener);
      });

      return () => {
        offReady();
        unsub();
      };
    },
  };
};
