import type { Route } from "../core/types.js";

export type RedirectOptions<
  FromParams = Record<string, unknown>,
  FromQuery = Record<string, unknown>,
  ToParams = FromParams,
  ToQuery = FromQuery,
> = {
  from: Route<FromParams, FromQuery>;
  to: Route<ToParams, ToQuery>;
  mapParams?: (params: FromParams) => ToParams;
  mapQuery?: (query: FromQuery) => ToQuery;
};

export const redirect = <
  FromParams = Record<string, unknown>,
  FromQuery = Record<string, unknown>,
  ToParams = FromParams,
  ToQuery = FromQuery,
>(
  options: RedirectOptions<FromParams, FromQuery, ToParams, ToQuery>,
): (() => void) => {
  const { from, to, mapParams, mapQuery } = options;

  return from.opened.subscribe((payload) => {
    const params = (mapParams ? mapParams(payload.params) : payload.params) as ToParams;
    const query = (mapQuery ? mapQuery(payload.query) : payload.query) as ToQuery;
    (to as Route<ToParams, ToQuery>).go(params, { query, replace: true });
  });
};
