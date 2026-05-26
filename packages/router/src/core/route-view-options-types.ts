import type { CreateRouteViewOptions } from "./page.js";

export type RouteViewOptionsConstraint = CreateRouteViewOptions<unknown, unknown, unknown> & {
  readonly name: string;
};

export type RouteViewNameFromOptions<O extends RouteViewOptionsConstraint> = O extends {
  readonly name: infer N extends string;
}
  ? string extends N
    ? never
    : N
  : never;

export type RouteViewParamsFromOptions<O extends RouteViewOptionsConstraint> =
  O extends CreateRouteViewOptions<infer P, unknown, unknown> ? P : Record<string, never>;

export type RouteViewQueryFromOptions<O extends RouteViewOptionsConstraint> =
  O extends CreateRouteViewOptions<unknown, infer Q, unknown> ? Q : Record<string, never>;

export type RouteViewDataFromOptions<O extends RouteViewOptionsConstraint> =
  O extends CreateRouteViewOptions<unknown, unknown, infer D> ? D : void;
