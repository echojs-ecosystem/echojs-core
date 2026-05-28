import { getRouteState } from "./route";
import { resolveRoutePath } from "./navigation";
import type { Route, RouterHistory } from "./types";

export type GuardRouteOptions = {
  route: Route<any, any>;
  canOpen: () => boolean;
  otherwise: Route<any, any>;
};

const guards: GuardRouteOptions[] = [];

export const registerGuard = (options: GuardRouteOptions): (() => void) => {
  guards.push(options);
  return () => {
    const index = guards.indexOf(options);
    if (index !== -1) guards.splice(index, 1);
  };
};

export const clearGuards = (): void => {
  guards.length = 0;
};

export const runRouteGuards = (
  history: RouterHistory,
  matchedRoute: Route<any, any>,
  query: Record<string, string>,
): boolean => {
  for (const guard of guards) {
    if (guard.route !== matchedRoute) continue;
    if (guard.canOpen()) return true;

    const otherwiseState = getRouteState(guard.otherwise);
    const params = (otherwiseState.$params.peek() ?? {}) as Record<string, string>;
    const target = resolveRoutePath(guard.otherwise, params, { query });
    history.replace(target);
    return false;
  }
  return true;
};
