import { getRouteState } from "../core/route";
import type { AnyRoute, Route } from "../core/types";
import type { QueryRecord } from "../core/query";

export type NavLinkMatch = "exact" | "partial";

const pathnameFromHref = (href: string): string => href.split("?")[0] ?? href;

const isPathPrefixMatch = (basePath: string, currentPath: string): boolean =>
  currentPath === basePath || currentPath.startsWith(`${basePath}/`);

export const isNavLinkActive = (
  to: Route<any, any> | undefined,
  options: {
    match?: NavLinkMatch;
    activeOn?: readonly Route<any, any>[];
    params?: Record<string, string>;
    query?: QueryRecord;
  },
): boolean => {
  if (!to) return false;

  const match = options.match ?? "exact";

  if (match === "exact") {
    if (to.$isOpened.value()) return true;
    return options.activeOn?.some((route) => route.$isOpened.value()) ?? false;
  }

  if (to.$isOpened.value()) return true;

  const state = getRouteState(to);
  const router = state.router;
  if (router?.isActive(to as AnyRoute)) return true;

  if (router && state.pathTemplate) {
    const base = pathnameFromHref(
      router.resolve(to as AnyRoute, options.params ?? {}, {
        query: options.query,
      }),
    );
    if (isPathPrefixMatch(base, router.$path.value())) return true;
  }

  return options.activeOn?.some((route) => route.$isOpened.value()) ?? false;
};
