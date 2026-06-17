import { createRouteViewModel, getPageState } from "./page";
import type {
  RouteViewDataFromOptions,
  RouteViewNameFromOptions,
  RouteViewOptionsConstraint,
  RouteViewParamsFromOptions,
  RouteViewQueryFromOptions,
} from "./route-view-options-types";
import type { LayoutPage, NamedPage } from "./types";

export type NamedLayoutView<
  Name extends string,
  Params = Record<string, never>,
  Query = Record<string, never>,
  Data = void,
> = LayoutPage & NamedPage<Name, Params, Query, Data>;

export const createLayoutView = <const Options extends RouteViewOptionsConstraint>(
  options: Options,
): NamedLayoutView<
  RouteViewNameFromOptions<Options>,
  RouteViewParamsFromOptions<Options>,
  RouteViewQueryFromOptions<Options>,
  RouteViewDataFromOptions<Options>
> => {
  const layout = createRouteViewModel(options);
  getPageState(layout).kind = "layout";
  return layout as NamedLayoutView<
    RouteViewNameFromOptions<Options>,
    RouteViewParamsFromOptions<Options>,
    RouteViewQueryFromOptions<Options>,
    RouteViewDataFromOptions<Options>
  >;
};

export { isLayoutPage } from "./page";
