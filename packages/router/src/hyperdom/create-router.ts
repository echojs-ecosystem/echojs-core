import { createRouter as createRouterCore } from "../core/create-router.js";
import type { CollectNamedRoutes, RouteTreeBranch } from "../core/path-types.js";
import type { CreateRouterOptions, Router } from "../core/types.js";
import type { Child } from "@echojs/hyperdom";

export type HyperdomRouter<TRoutes extends Router["routes"] = Router["routes"]> = Omit<
  Router<TRoutes>,
  "View"
> & {
  readonly View: () => Child;
};

export const createRouter = <const TRoutes extends readonly RouteTreeBranch[]>(
  options: CreateRouterOptions<TRoutes>,
): HyperdomRouter<CollectNamedRoutes<TRoutes>> =>
  createRouterCore(options) as HyperdomRouter<CollectNamedRoutes<TRoutes>>;
