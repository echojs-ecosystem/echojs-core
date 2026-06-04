import type { EchoAppOptions } from "./types";

/**
 * Declares a custom root view (when not using `app.use(router)`).
 *
 * ```ts
 * export const appRoot = defineAppRoot({ view: () => AppView() });
 * createEchoApp(appRoot).use(query).mount("#app");
 * ```
 */
export const defineAppRoot = (options: EchoAppOptions): EchoAppOptions => {
  if (options.view === undefined) {
    throw new Error("echojs: defineAppRoot requires `view` (use `app.use(router)` for routing)");
  }
  return options;
};
