import { createQueryParams } from "../core/create-query-params";
import type { CreateQueryParamsOptions, Parser, QueryParamsState } from "../core/types";
import { createRouterUrlStateAdapter, type RouterLike } from "./router-adapter";
import { registerUrlStateRouter } from "./router-registry";

export type RouterBoundQueryParams = <
  Schema extends Record<string, Parser<any>>,
>(
  schema: Schema,
  options?: Omit<CreateQueryParamsOptions<Schema>, "adapter">,
) => QueryParamsState<Schema>;

export type RouterWithQueryParams<TRouter extends RouterLike> = TRouter & {
  createQueryParams: RouterBoundQueryParams;
};

export const attachRouterQueryParams = <TRouter extends RouterLike>(
  router: TRouter,
): RouterWithQueryParams<TRouter> => {
  registerUrlStateRouter(router);

  const bound: RouterBoundQueryParams = (schema, options) =>
    createQueryParams(schema, {
      ...options,
      adapter: createRouterUrlStateAdapter(router)!,
    });

  return Object.assign(router, { createQueryParams: bound }) as RouterWithQueryParams<TRouter>;
};
