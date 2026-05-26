import { createRouteViewModel, getPageState, type CreateRouteViewOptions } from "./page.js";
import type {
  RouteViewDataFromOptions,
  RouteViewNameFromOptions,
  RouteViewOptionsConstraint,
  RouteViewParamsFromOptions,
  RouteViewQueryFromOptions,
} from "./route-view-options-types.js";
import type { LayoutPage, NamedPage } from "./types.js";

export type NamedLayoutView<
  Name extends string,
  Params = Record<string, never>,
  Query = Record<string, never>,
  Data = void,
> = LayoutPage & NamedPage<Name, Params, Query, Data>;

export const createLayoutView = <const O extends RouteViewOptionsConstraint>(
  options: O,
): NamedLayoutView<
  RouteViewNameFromOptions<O>,
  RouteViewParamsFromOptions<O>,
  RouteViewQueryFromOptions<O>,
  RouteViewDataFromOptions<O>
> => {
  const layout = createRouteViewModel(options);
  getPageState(layout).kind = "layout";
  return layout as NamedLayoutView<
    RouteViewNameFromOptions<O>,
    RouteViewParamsFromOptions<O>,
    RouteViewQueryFromOptions<O>,
    RouteViewDataFromOptions<O>
  >;
};

export { isLayoutPage } from "./page.js";
