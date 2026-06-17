import { createView } from "@echojs-ecosystem/hyperdom";
import type { Child } from "@echojs-ecosystem/hyperdom";

import type { Router } from "../core/types";

export const ROUTER_KEY = Symbol.for("echojs.router");

export type RouterLike = Pick<Router, "View" | "start" | "stop">;

export type RouterProviderHost = {
  provide?<T>(key: symbol, value: T): unknown;
};

export type RouterProviderOptions = {
  /** @default true */
  autoStart?: boolean;
};

/** Provider shape accepted by `createEchoApp().use(...)`. */
export type RouterProvider = {
  name: "router";
  setup: (app: RouterProviderHost) => void;
  resolveRoot: () => Child;
};

export const isRouterLike = (value: unknown): value is RouterLike =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as RouterLike).View === "function" &&
  typeof (value as RouterLike).start === "function";

export const createRouterProvider = (
  router: RouterLike,
  options: RouterProviderOptions = {},
): RouterProvider => ({
  name: "router",
  setup(app) {
    app.provide?.(ROUTER_KEY, router);
  },
  resolveRoot() {
    if (options.autoStart !== false) {
      router.start();
    }
    // Return outlet as a dynamic child (do not call router.View() here — that runs
    // layout/page trees outside render/view context and breaks strict hyperdom checks).
    const RootView = createView(() => router.View as Child, "EchoRouterRoot");
    return RootView();
  },
});
