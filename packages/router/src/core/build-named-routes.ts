import type { AnyRoute } from "./types";
import type { RouteTreeEntry } from "./path-types";

export type NamedRoutesMap = Readonly<Record<string, AnyRoute>>;

const requireEntryName = (entry: RouteTreeEntry, pathHint: string): string => {
  const name = entry.name;
  if (!name) {
    throw new TypeError(
      `Route at "${pathHint}" must define "name" in createRouter({ routes }) for typed router.routes.`,
    );
  }
  return name;
};

const register = (bucket: Record<string, AnyRoute>, key: string, route: AnyRoute): void => {
  if (bucket[key]) {
    throw new Error(`Duplicate route name "${key}" in createRouter({ routes }).`);
  }
  bucket[key] = route;
};

const walk = (
  entries: readonly RouteTreeEntry[],
  bucket: Record<string, AnyRoute>,
  parentPath = "/",
): void => {
  for (const entry of entries) {
    const pathHint = `${parentPath}${entry.path}`;

    if ("routeView" in entry && !("layoutView" in entry)) {
      register(bucket, requireEntryName(entry, pathHint), entry.routeView as AnyRoute);
      continue;
    }

    if ("route" in entry && !("routeView" in entry) && !("layoutView" in entry)) {
      register(bucket, requireEntryName(entry, pathHint), entry.route);
      if ("children" in entry && entry.children?.length) {
        walk(entry.children, bucket, pathHint);
      }
      continue;
    }

    if ("layoutView" in entry && "children" in entry) {
      register(bucket, requireEntryName(entry, pathHint), entry.layoutView as AnyRoute);
      const { children } = entry;
      if (children?.length) {
        walk(children, bucket, pathHint);
      }
    }
  }
};

/** Flat `router.routes` keyed by route config `name` (not URL segments). */
export const buildNamedRoutes = (entries: readonly RouteTreeEntry[]): NamedRoutesMap => {
  const bucket: Record<string, AnyRoute> = {};
  walk(entries, bucket);
  return bucket;
};
