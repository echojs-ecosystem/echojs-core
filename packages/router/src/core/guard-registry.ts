import { getRouteState } from "./route";
import { resolveRoutePath } from "./navigation";
import type { Route, RouterHistory } from "./types";

export type GuardRouteOptions = {
  route: Route<any, any>;
  canOpen: () => boolean;
  otherwise: Route<any, any>;
};

export const runRouteGuards = (
  history: RouterHistory,
  matchedRoutes: readonly Route<any, any>[],
  query: Record<string, string>,
  guards: readonly GuardRouteOptions[],
): boolean => {
  for (const matchedRoute of matchedRoutes) {
    for (const guard of guards) {
      if (guard.route !== matchedRoute) continue;
      if (guard.canOpen()) continue;

      const otherwiseState = getRouteState(guard.otherwise);
      const params = (otherwiseState.$params.peek() ?? {}) as Record<string, string>;
      const target = resolveRoutePath(guard.otherwise, params, { query });
      history.replace(target);
      return false;
    }
  }
  return true;
};

export type RouteGuardRegistry = {
  readonly guards: GuardRouteOptions[];
  add(options: GuardRouteOptions): () => void;
  run(
    history: RouterHistory,
    matchedRoutes: readonly Route<any, any>[],
    query: Record<string, string>,
  ): boolean;
};

export const createRouteGuardRegistry = (
  initial: readonly GuardRouteOptions[] = [],
): RouteGuardRegistry => {
  const guards = [...initial];

  return {
    guards,
    add(options) {
      guards.push(options);
      return () => {
        const index = guards.indexOf(options);
        if (index !== -1) guards.splice(index, 1);
      };
    },
    run(history, matchedRoutes, query) {
      return runRouteGuards(history, matchedRoutes, query, guards);
    },
  };
};
