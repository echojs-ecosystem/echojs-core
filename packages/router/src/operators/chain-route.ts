import { signal } from "@echojs-ecosystem/reactivity";
import type { Route, ChainedRoute } from "../core/types.js";

export type ChainRouteOptions<Params, Query, Result = void> = {
  route: Route<Params, Query>;
  beforeOpen: (context: { params: Params; query: Query }) => Result | Promise<Result>;
};

export const chainRoute = <Params, Query, Result = void>(
  options: ChainRouteOptions<Params, Query, Result>,
): ChainedRoute<Params, Query, Result> => {
  const { route, beforeOpen } = options;

  const $isOpened = signal(false);
  const $pending = signal(false);
  const $error = signal<unknown | null>(null);
  const $params = signal<Params | null>(null);
  const $query = signal<Query>({} as Query);
  const $result = signal<Result | null>(null);

  let runId = 0;

  const reset = (): void => {
    $isOpened.set(false);
    $pending.set(false);
    $error.set(null);
    $params.set(null);
    $query.set({} as Query);
    $result.set(null);
  };

  route.opened.subscribe((payload) => {
    const id = ++runId;
    reset();
    $pending.set(true);
    $params.set(payload.params);
    $query.set(payload.query);

    Promise.resolve(beforeOpen({ params: payload.params, query: payload.query }))
      .then((result) => {
        if (id !== runId) return;
        $pending.set(false);
        $error.set(null);
        $result.set(result);
        $isOpened.set(true);
      })
      .catch((error) => {
        if (id !== runId) return;
        $pending.set(false);
        $error.set(error);
        $isOpened.set(false);
      });
  });

  route.closed.subscribe(() => {
    runId += 1;
    reset();
  });

  return {
    $isOpened,
    $pending,
    $error,
    $params,
    $query,
    $result,
  };
};
