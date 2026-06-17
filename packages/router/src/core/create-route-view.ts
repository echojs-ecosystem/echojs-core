import { createRouteViewModel, type CreateRouteViewOptions } from "./page";
import type {
  RouteViewDataFromOptions,
  RouteViewNameFromOptions,
  RouteViewOptionsConstraint,
  RouteViewParamsFromOptions,
  RouteViewQueryFromOptions,
} from "./route-view-options-types";
import type { NamedPage } from "./types";

export function createRouteView<const Options extends RouteViewOptionsConstraint>(
  options: Options,
): NamedPage<
  RouteViewNameFromOptions<Options>,
  RouteViewParamsFromOptions<Options>,
  RouteViewQueryFromOptions<Options>,
  RouteViewDataFromOptions<Options>
>;

export function createRouteView<
  Params = Record<string, never>,
  Query = Record<string, never>,
  Data = void,
>(
  options: CreateRouteViewOptions<Params, Query, Data> & { readonly name: string },
): NamedPage<string, Params, Query, Data>;

export function createRouteView(
  options: CreateRouteViewOptions<unknown, unknown, unknown> & { readonly name: string },
) {
  return createRouteViewModel(options);
}

export type { CreateRouteViewOptions };
