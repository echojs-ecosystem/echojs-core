import type { EchoApp } from "./types";
import type { EchoRouterSource } from "./types";
import { ROUTER_KEY } from "./resolve-app-options";

export const injectRouter = <TRouter extends EchoRouterSource = EchoRouterSource>(
  app: EchoApp,
): TRouter => {
  const router = app.inject<TRouter>(ROUTER_KEY);
  if (!router) {
    throw new Error(
      "echojs: router is not available. Pass `router` to defineAppRoot() or app.use(createRouterProvider(...)).",
    );
  }
  return router;
};
