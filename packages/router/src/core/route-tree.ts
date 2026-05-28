import { joinRoutePaths, matchPath } from "./path";
import type { RouteConfig } from "./types";
import type { AnyRoute } from "./types";

export type FlatRouteEntry = {
  path: string;
  route: AnyRoute;
  parent: FlatRouteEntry | null;
};

export const flattenRouteTree = (
  configs: RouteConfig[],
  parentPath = "/",
  parent: FlatRouteEntry | null = null,
): FlatRouteEntry[] => {
  const result: FlatRouteEntry[] = [];

  for (const config of configs) {
    const path = joinRoutePaths(parentPath, config.path);
    const entry: FlatRouteEntry = { path, route: config.route, parent };
    result.push(entry);

    if (config.children?.length) {
      result.push(...flattenRouteTree(config.children, path, entry));
    }
  }

  return result;
};

export type RouteMatchChain = {
  leaf: FlatRouteEntry;
  chain: FlatRouteEntry[];
  leafParams: Record<string, string>;
};

const routeDepth = (entry: FlatRouteEntry): number => {
  let depth = 0;
  let cursor: FlatRouteEntry | null = entry.parent;
  while (cursor) {
    depth += 1;
    cursor = cursor.parent;
  }
  return depth;
};

/** Prefer longer paths; on a tie prefer the deeper child (index `path: "/"` under a layout). */
const isBetterMatch = (entry: FlatRouteEntry, best: FlatRouteEntry): boolean => {
  if (entry.path.length > best.path.length) return true;
  if (entry.path.length < best.path.length) return false;
  return routeDepth(entry) > routeDepth(best);
};

export const matchRouteChain = (
  pathname: string,
  flatRoutes: FlatRouteEntry[],
): RouteMatchChain | null => {
  let best: { entry: FlatRouteEntry; params: Record<string, string> } | null = null;

  for (const entry of flatRoutes) {
    const result = matchPath(entry.path, pathname);
    if (!result.matched) continue;

    if (!best || isBetterMatch(entry, best.entry)) {
      best = { entry, params: result.params };
    }
  }

  if (!best) return null;

  const chain: FlatRouteEntry[] = [];
  let cursor: FlatRouteEntry | null = best.entry;
  while (cursor) {
    chain.unshift(cursor);
    cursor = cursor.parent;
  }

  return {
    leaf: best.entry,
    chain,
    leafParams: best.params,
  };
};

export const matchParamsForEntry = (
  entry: FlatRouteEntry,
  pathname: string,
): Record<string, string> => matchPath(entry.path, pathname).params;
