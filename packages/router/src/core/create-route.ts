import { createRouteModel } from "./route.js";
import type { NamedRoute, Route } from "./types.js";

export const createRoute = <
  const Name extends string,
  Params = Record<string, never>,
  Query = Record<string, never>,
>(
  name: Name,
): NamedRoute<Name, Params, Query> =>
  createRouteModel<Params, Query>(name) as NamedRoute<Name, Params, Query>;
