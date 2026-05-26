import type { Child } from "@echojs/hyperdom";
import { createRouterViewComponent } from "../core/router-view.js";
import type { Page, RouteView, Router } from "../core/types.js";
import type { RouterRouteDefinition } from "../core/types.js";

export type RouterViewContext<Params, Query> = {
  params: Params;
  query: Query;
  outlet: () => Child;
};

export type RouterViewEntry<Params = unknown, Query = unknown> = {
  page: Page<Params, Query, any>;
  children?: RouterViewEntry[];
};

export type RouterViewOptions = {
  fallback?: () => Child;
};

/** @deprecated Use createRouter({ routes }) and `router.view()` / `router.View`. */
export const RouterView = (
  router: Router,
  entries: RouterViewEntry[],
  options?: RouterViewOptions,
): (() => Child) => {
  const toRoutes = (items: RouterViewEntry[]): RouterRouteDefinition[] =>
    items.map((entry) => {
      const name = entry.page.name ?? "page";
      const mapped: RouterRouteDefinition = {
        path: "/",
        name,
        routeView: entry.page,
      };
      if (entry.children?.length) {
        return { ...mapped, children: toRoutes(entry.children) };
      }
      return mapped;
    });

  const notFoundView: RouteView | undefined = options?.fallback
    ? () => options.fallback!()
    : undefined;

  const view = createRouterViewComponent(router, {
    routes: toRoutes(entries),
    notFoundView,
  });
  return () => view() as Child;
};
