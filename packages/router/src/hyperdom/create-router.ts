import { createRouter as createRouterCore } from "../core/create-router";
import type { CollectNamedRoutes, RouteTreeBranch } from "../core/path-types";
import type { CreateRouterOptions, Router } from "../core/types";
import type { Child } from "@echojs-ecosystem/hyperdom";
import { attachRouterQueryParams, type RouterBoundQueryParams } from "@echojs-ecosystem/url-state";

export type HyperdomRouter<TRoutes extends Router["routes"] = Router["routes"]> = Omit<
  Router<TRoutes>,
  "View"
> & {
  readonly View: () => Child;
  createQueryParams: RouterBoundQueryParams;
};

export const createRouter = <const TRoutes extends readonly RouteTreeBranch[]>(
  options: CreateRouterOptions<TRoutes>,
): HyperdomRouter<CollectNamedRoutes<TRoutes>> =>
  attachRouterQueryParams(
    createRouterCore(options) as HyperdomRouter<CollectNamedRoutes<TRoutes>>,
  );
