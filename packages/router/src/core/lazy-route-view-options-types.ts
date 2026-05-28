import type { LazyRouteViewLoader } from "./lazy-view";
import type { BeforeLoadContext, CreateRouteViewOptions } from "./page";

export type LazyRouteViewOptionsConstraint = {
  readonly name: string;
  view: LazyRouteViewLoader<unknown, unknown, unknown>;
  beforeLoad?: (ctx: BeforeLoadContext<unknown, unknown>) => unknown | Promise<unknown>;
  loadingView?: CreateRouteViewOptions<unknown, unknown, unknown>["loadingView"];
  errorView?: CreateRouteViewOptions<unknown, unknown, unknown>["errorView"];
};

export type LazyRouteViewNameFromOptions<O extends LazyRouteViewOptionsConstraint> = O extends {
  readonly name: infer N extends string;
}
  ? string extends N
    ? never
    : N
  : never;

export type LazyRouteViewParamsFromOptions<O extends LazyRouteViewOptionsConstraint> =
  O extends {
    beforeLoad?: (ctx: BeforeLoadContext<infer P, unknown>) => unknown;
  }
    ? P
    : Record<string, never>;

export type LazyRouteViewQueryFromOptions<O extends LazyRouteViewOptionsConstraint> =
  O extends {
    beforeLoad?: (ctx: BeforeLoadContext<unknown, infer Q>) => unknown;
  }
    ? Q
    : Record<string, never>;

export type LazyRouteViewDataFromOptions<O extends LazyRouteViewOptionsConstraint> =
  O extends {
    beforeLoad?: (ctx: BeforeLoadContext<unknown, unknown>) => infer D;
  }
    ? Awaited<D>
    : void;
