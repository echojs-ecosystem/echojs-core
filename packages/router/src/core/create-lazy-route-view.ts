import { createRouteViewModel } from "./page";
import type { LazyRouteViewLoader } from "./lazy-view";
import type {
  LazyRouteViewDataFromOptions,
  LazyRouteViewNameFromOptions,
  LazyRouteViewOptionsConstraint,
  LazyRouteViewParamsFromOptions,
  LazyRouteViewQueryFromOptions,
} from "./lazy-route-view-options-types";
import type { BeforeLoadContext, CreateRouteViewOptions } from "./page";
import type { NamedPage, RouteLoadingView, RouteErrorView } from "./types";

export type CreateLazyRouteViewOptions<
  Params = Record<string, never>,
  Query = Record<string, never>,
  Data = void,
> = {
  name?: string;
  /** Dynamic import — module must `export default` a route view function. */
  view: LazyRouteViewLoader<Params, Query, Data>;
  beforeLoad?: (ctx: BeforeLoadContext<Params, Query>) => Data | Promise<Data>;
  loadingView?: RouteLoadingView;
  errorView?: RouteErrorView;
};

export function createLazyRouteView<const O extends LazyRouteViewOptionsConstraint>(
  options: O,
): NamedPage<
  LazyRouteViewNameFromOptions<O>,
  LazyRouteViewParamsFromOptions<O>,
  LazyRouteViewQueryFromOptions<O>,
  LazyRouteViewDataFromOptions<O>
>;

export function createLazyRouteView<
  Params = Record<string, never>,
  Query = Record<string, never>,
  Data = void,
>(
  options: CreateLazyRouteViewOptions<Params, Query, Data> & { readonly name: string },
): NamedPage<string, Params, Query, Data>;

export function createLazyRouteView(
  options: CreateLazyRouteViewOptions<unknown, unknown, unknown> & { readonly name: string },
) {
  return createRouteViewModel({
    name: options.name,
    viewLoader: options.view,
    beforeLoad: options.beforeLoad,
    loadingView: options.loadingView,
    errorView: options.errorView,
  });
}
