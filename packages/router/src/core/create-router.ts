import { resolveHistory } from "./history-config";
import { createRouterModel } from "./router";
import type { CollectNamedRoutes, RouteTreeBranch } from "./path-types";
import type { RouterModelOptions } from "./router";
import type { CreateRouterOptions, Router } from "./types";

export const createRouter = <const TRoutes extends readonly RouteTreeBranch[]>(
  options: CreateRouterOptions<TRoutes>,
): Router<CollectNamedRoutes<TRoutes>> => {
  const { history: historyConfig, routes, ...rest } = options;
  const history = resolveHistory(historyConfig);
  return createRouterModel({ ...rest, history, routes } as RouterModelOptions) as unknown as Router<
    CollectNamedRoutes<TRoutes>
  >;
};
