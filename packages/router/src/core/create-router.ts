import { resolveHistory } from "./history-config.js";
import { createRouterModel } from "./router.js";
import type { CollectNamedRoutes, RouteTreeBranch } from "./path-types.js";
import type { RouterModelOptions } from "./router.js";
import type { CreateRouterOptions, Router } from "./types.js";

export const createRouter = <const TRoutes extends readonly RouteTreeBranch[]>(
  options: CreateRouterOptions<TRoutes>,
): Router<CollectNamedRoutes<TRoutes>> => {
  const { history: historyConfig, routes, ...rest } = options;
  const history = resolveHistory(historyConfig);
  return createRouterModel({ ...rest, history, routes } as RouterModelOptions) as unknown as Router<
    CollectNamedRoutes<TRoutes>
  >;
};
