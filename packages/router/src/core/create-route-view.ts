import { createRouteViewModel, type CreateRouteViewOptions } from "./page.js";
import type {
  RouteViewDataFromOptions,
  RouteViewNameFromOptions,
  RouteViewOptionsConstraint,
  RouteViewParamsFromOptions,
  RouteViewQueryFromOptions,
} from "./route-view-options-types.js";
import type { NamedPage } from "./types.js";

export function createRouteView<const O extends RouteViewOptionsConstraint>(
  options: O,
): NamedPage<
  RouteViewNameFromOptions<O>,
  RouteViewParamsFromOptions<O>,
  RouteViewQueryFromOptions<O>,
  RouteViewDataFromOptions<O>
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
