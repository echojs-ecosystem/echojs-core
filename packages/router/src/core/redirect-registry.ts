import type { Route } from "./types";

export type RedirectOptions = {
  from: Route<any, any>;
  to: Route<any, any>;
  mapParams?: (params: any) => any;
  mapQuery?: (query: any) => any;
};

/** Strict redirect rule when `from`/`to` param and query types differ. */
export type TypedRedirectOptions<
  FromParams = any,
  FromQuery = any,
  ToParams = any,
  ToQuery = any,
> = {
  from: Route<FromParams, FromQuery>;
  to: Route<ToParams, ToQuery>;
  mapParams?: (params: FromParams) => ToParams;
  mapQuery?: (query: FromQuery) => ToQuery;
};

export type RouteRedirectRegistry = {
  readonly redirects: RedirectOptions[];
  add(options: RedirectOptions): () => void;
  bind(): () => void;
};

export const createRouteRedirectRegistry = (
  initial: readonly RedirectOptions[] = [],
): RouteRedirectRegistry => {
  const redirects = [...initial];
  let unbind: (() => void) | null = null;

  const bind = (): (() => void) => {
    unbind?.();
    const disposers = redirects.map(({ from, to, mapParams, mapQuery }) =>
      from.opened.subscribe((payload) => {
        const params = mapParams ? mapParams(payload.params) : payload.params;
        const query = mapQuery ? mapQuery(payload.query) : payload.query;
        to.go(params as never, { query: query as never, replace: true });
      }),
    );
    unbind = () => {
      for (const dispose of disposers) dispose();
      unbind = null;
    };
    return unbind;
  };

  return {
    redirects,
    add(options) {
      redirects.push(options);
      return () => {
        const index = redirects.indexOf(options);
        if (index !== -1) redirects.splice(index, 1);
      };
    },
    bind() {
      return bind();
    },
  };
};
