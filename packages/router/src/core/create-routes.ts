import type { CollectNamedRoutes, RouteTreeNode } from "./path-types.js";

/**
 * Builds a typed route tree for `createRouter({ routes })`.
 * Use `routeView`, `layoutView`, and `route` (redirect) on each entry.
 */
export function createRoutes<const TRoutes extends readonly RouteTreeNode[]>(
  routes: TRoutes,
): TRoutes {
  return routes;
}

export type RoutesFromConfig<TRoutes extends readonly RouteTreeNode[]> = CollectNamedRoutes<TRoutes>;
