import { buildPath, joinLocation, splitLocation } from "./path.js";
import { parseQuery, stringifyQuery, type QueryRecord } from "./query.js";
import type { Route } from "./types.js";
import { getRouteState } from "./route.js";

export const buildRouteLocation = (
  pathTemplate: string,
  params: Record<string, string> = {},
  query?: QueryRecord,
): string => {
  const pathname = buildPath(pathTemplate, params);
  const search = query ? stringifyQuery(query) : "";
  return joinLocation(pathname, search);
};

export const resolveRoutePath = (
  route: Route<any, any>,
  params?: Record<string, string>,
  options?: { query?: Record<string, unknown> },
): string => {
  const state = getRouteState(route);
  if (!state.pathTemplate) {
    throw new Error("Route is not registered in a router");
  }
  return buildRouteLocation(
    state.pathTemplate,
    params ?? {},
    options?.query as QueryRecord | undefined,
  );
};

export const parseLocation = (
  location: string,
): { pathname: string; search: string; query: Record<string, string> } => {
  const { pathname, search } = splitLocation(location);
  return {
    pathname,
    search,
    query: parseQuery(search),
  };
};
