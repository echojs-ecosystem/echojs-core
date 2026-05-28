import type { AnyRoute, RedirectRouteEntry } from "../src/core/types";

/** Programmatic route entry — `name` берётся из `route.name`. */
export const r = <const P extends string>(
  path: P,
  route: AnyRoute & { readonly name: string },
): RedirectRouteEntry<P, string> => ({
  path,
  name: route.name,
  route,
});
