import { signal } from "@echojs-ecosystem/reactivity";
import type { Signal } from "@echojs-ecosystem/reactivity";
import { buildPath, joinLocation } from "./path";
import { createRouteEvent, type RouteEventEmitter } from "./route-event";
import { mapQueryToRecord, stringifyQuery, type QueryRecord } from "./query";
import type { GoOptions, Route, RouteOpenedPayload } from "./types";
import type { RouterInternal } from "./router";

export type RouteInternalState<Params, Query> = {
  name?: string;
  pathTemplate: string | null;
  router: RouterInternal | null;
  $isOpened: Signal<boolean>;
  $params: Signal<Params | null>;
  $query: Signal<Query>;
  $path: Signal<string | null>;
  $fullPath: Signal<string | null>;
  opened: RouteEventEmitter<RouteOpenedPayload<Params, Query>>;
  closed: RouteEventEmitter<void>;
  wasOpened: boolean;
};

const routeStates = new WeakMap<Route<any, any>, RouteInternalState<any, any>>();

export const getRouteState = <Params, Query>(
  route: Route<Params, Query>,
): RouteInternalState<Params, Query> => {
  const state = routeStates.get(route);
  if (!state) {
    throw new Error("Unknown route instance");
  }
  return state;
};

export const bindRouteToRouter = (
  route: Route<any, any>,
  router: RouterInternal,
  pathTemplate: string,
): void => {
  const state = getRouteState(route);
  state.router = router;
  state.pathTemplate = pathTemplate;
};

export const createRouteModel = <Params = Record<string, never>, Query = Record<string, never>>(
  name?: string,
): Route<Params, Query> => {
  const $isOpened = signal(false);
  const $params = signal<Params | null>(null);
  const $query = signal<Query>({} as Query);
  const $path = signal<string | null>(null);
  const $fullPath = signal<string | null>(null);
  const opened = createRouteEvent<RouteOpenedPayload<Params, Query>>();
  const closed = createRouteEvent<void>();

  const state: RouteInternalState<Params, Query> = {
    name,
    pathTemplate: null,
    router: null,
    $isOpened,
    $params,
    $query,
    $path,
    $fullPath,
    opened,
    closed,
    wasOpened: false,
  };

  const go = (...args: [Params?, GoOptions<Query>?]): void => {
    const [params, options] = args;
    if (!state.router || !state.pathTemplate) {
      throw new Error(
        `Route${name ? ` "${name}"` : ""} is not registered in a router. Pass it to createRouter({ routes }).`,
      );
    }

    const pathname = buildPath(state.pathTemplate, (params ?? {}) as Record<string, string>);
    const search = options?.query ? stringifyQuery(options.query as QueryRecord) : "";
    const fullPath = joinLocation(pathname, search);
    if (options?.replace) state.router.replace(fullPath);
    else state.router.go(fullPath);
  };

  const route: Route<Params, Query> = {
    name,
    $isOpened,
    $params,
    $query,
    $path,
    $fullPath,
    opened,
    closed,
    go,
    open: go,
    close() {
      if (!state.router) {
        throw new Error(`Route${name ? ` "${name}"` : ""} is not registered in a router.`);
      }
      state.router.closeRoute(route);
    },
  };

  routeStates.set(route, state);
  return route;
};

export const applyRouteClosed = <Params, Query>(
  state: RouteInternalState<Params, Query>,
): void => {
  const wasOpened = state.wasOpened;
  state.$isOpened.set(false);
  state.$params.set(null);
  state.$path.set(null);
  state.$fullPath.set(null);
  state.$query.set({} as Query);
  state.wasOpened = false;
  if (wasOpened) {
    state.closed.emit();
  }
};

export const applyRouteOpened = <Params, Query>(
  state: RouteInternalState<Params, Query>,
  payload: {
    params: Params;
    query: Query;
    path: string;
    fullPath: string;
  },
): void => {
  const wasOpened = state.wasOpened;
  state.$isOpened.set(true);
  state.$params.set(payload.params);
  state.$query.set(payload.query);
  state.$path.set(payload.path);
  state.$fullPath.set(payload.fullPath);
  state.wasOpened = true;
  if (!wasOpened) {
    state.opened.emit(payload);
  }
};

export const rawQueryToTyped = <Query>(raw: Record<string, string>): Query =>
  mapQueryToRecord(raw) as Query;
