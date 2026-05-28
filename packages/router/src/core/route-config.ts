import { assertLayoutPage, assertPage, getPageState, isLayoutPage } from "./page";
import type { RouteViewEntry, RouteTreeEntry } from "./path-types";
import type { AnyRoute, RouteConfig } from "./types";

const isRouteViewEntry = (item: RouteTreeEntry): item is RouteViewEntry =>
  "routeView" in item && !("layoutView" in item);

export const toRouteConfigs = (definitions: readonly RouteTreeEntry[]): RouteConfig[] => {
  const walk = (items: readonly RouteTreeEntry[], parentPath = ""): RouteConfig[] => {
    const result: RouteConfig[] = [];

    for (const item of items) {
      const path = parentPath ? `${parentPath}/${item.path}`.replace(/\/+/g, "/") : item.path;

      if ("route" in item && !("routeView" in item) && !("layoutView" in item)) {
        const childConfigs =
          "children" in item && item.children?.length ? walk(item.children, path) : undefined;
        result.push({
          path,
          route: item.route,
          ...(childConfigs?.length ? { children: childConfigs } : {}),
        });
        continue;
      }

      if ("layoutView" in item) {
        const { layoutView, children, path: segment } = item;
        assertLayoutPage(
          layoutView as import("./types").Route,
          `routes[{ path: "${segment}", layoutView }]`,
        );
        if (!children?.length) {
          throw new TypeError(
            `Layout route "${path}" requires "children" with nested route views.`,
          );
        }
        result.push({
          path,
          route: layoutView as AnyRoute,
          children: walk(children, path),
        });
        continue;
      }

      if (!isRouteViewEntry(item)) {
        throw new TypeError(
          `Route at "${path}" must define "routeView", "layoutView", or "route".`,
        );
      }

      const { routeView } = item;
      assertPage(routeView, "createRouter");
      const routeState = getPageState(routeView);
      if (!routeState.view && !routeState.viewLoader) {
        throw new TypeError(
          `Route at "${path}" must define a view via createRouteView(), createLazyRouteView(), or createLayoutView().`,
        );
      }

      if (isLayoutPage(routeView)) {
        throw new TypeError(
          `Route "${path}": use "layoutView" instead of "routeView" for createLayoutView() instances.`,
        );
      }

      result.push({ path, route: routeView as AnyRoute });
    }

    return result;
  };

  return walk(definitions);
};
