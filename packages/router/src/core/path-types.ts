import type { AnyPage, AnyRoute, LayoutPage } from "./types";

export type RouteViewConfig<
  P extends string = string,
  N extends string = string,
  TRouteView = AnyPage,
> = {
  readonly path: P;
  readonly name: N;
  readonly routeView: TRouteView;
};

export type RedirectConfig<
  P extends string = string,
  N extends string = string,
  TRoute = AnyRoute,
> = {
  readonly path: P;
  readonly name: N;
  readonly route: TRoute;
  readonly children?: readonly RouteTreeNode[];
};

export type LayoutViewConfig<
  P extends string = string,
  N extends string = string,
  TLayoutView extends LayoutPage = LayoutPage,
> = {
  readonly path: P;
  readonly name: N;
  readonly layoutView: TLayoutView;
  readonly children: readonly RouteTreeNode[];
};

/** Discriminated route-tree node for `createRoutes()`. */
export type RouteTreeNode = RouteViewConfig | LayoutViewConfig | RedirectConfig;

/** @deprecated Use RouteTreeNode */
export type RouteTreeInput = RouteTreeNode;

export type JoinPaths<Parent extends string, Child extends string> = Child extends
  | "/"
  | ""
  ? Parent
  : Child extends `/${infer Rest}`
    ? Rest extends ""
      ? "/"
      : `/${Rest}`
    : Parent extends "/"
      ? `/${Child}`
      : `${Parent}/${Child}`;

type EntryPathsFrom<
  Parent extends string,
  Entries extends readonly RouteTreeBranch[],
> = Entries[number] extends infer Entry
  ? Entry extends { path: infer P extends string }
    ? JoinPaths<Parent, P> | (Entry extends { children: infer C extends readonly RouteTreeBranch[] }
        ? EntryPathsFrom<JoinPaths<Parent, P>, C>
        : never)
    : never
  : never;

type EntryFullPath<Entry> = Entry extends { path: infer P extends string }
  ? Entry extends { children: infer C extends readonly RouteTreeBranch[] }
    ? JoinPaths<"/", P> | EntryPathsFrom<JoinPaths<"/", P>, C>
    : JoinPaths<"/", P>
  : never;

export type RouteTreeBranch = RouteTreeEntry | RouteTreeNode;

export type CollectRoutePaths<TRoutes extends readonly RouteTreeBranch[]> =
  TRoutes[number] extends infer Entry ? EntryFullPath<Entry> : never;

type UnionToIntersection<U> = (U extends unknown ? (arg: U) => void : never) extends (
  arg: infer I,
) => void
  ? I
  : never;

type ConfigNamed<E, T> = E extends { readonly name: infer N extends string }
  ? string extends N
    ? Record<string, never>
    : { readonly [K in N]: T }
  : Record<string, never>;

type RouteViewNamed<E> = E extends { routeView: infer V extends AnyRoute }
  ? ConfigNamed<E, V>
  : Record<string, never>;

type LayoutViewNamed<E> = E extends { layoutView: infer L extends AnyRoute }
  ? ConfigNamed<E, L>
  : Record<string, never>;

type RedirectRouteNamed<E> = E extends { route: infer R extends AnyRoute }
  ? ConfigNamed<E, R>
  : Record<string, never>;

type EntryNames<E> = RouteViewNamed<E> & LayoutViewNamed<E> & RedirectRouteNamed<E>;

type PrevDepth = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

type EntryNamesDeep<E, D extends number> = D extends 0
  ? Record<string, never>
  : EntryNames<E> &
      (E extends { children: readonly RouteTreeBranch[] }
        ? UnionToIntersection<EntryNamesDeep<E["children"][number], PrevDepth[D]>>
        : Record<string, never>);

type NamedRoutesFromTree<TRoutes extends readonly RouteTreeBranch[]> = UnionToIntersection<
  EntryNamesDeep<TRoutes[number], 16>
>;

export type CollectNamedRoutes<TRoutes> = TRoutes extends readonly RouteTreeBranch[]
  ? NamedRoutesFromTree<TRoutes> extends infer R
    ? keyof R extends never
      ? Record<string, never>
      : R
    : Record<string, never>
  : Record<string, never>;

export type RouteViewEntry<
  P extends string = string,
  N extends string = string,
  TRouteView = AnyPage,
> = RouteViewConfig<P, N, TRouteView>;

export type LayoutViewEntry<
  P extends string = string,
  N extends string = string,
  TLayoutView extends LayoutPage = LayoutPage,
> = LayoutViewConfig<P, N, TLayoutView>;

export type RedirectRouteEntry<
  P extends string = string,
  N extends string = string,
  TRoute = AnyRoute,
> = RedirectConfig<P, N, TRoute>;

/** @deprecated Use RouteViewEntry */
export type PageRouteEntry<
  P extends string = string,
  N extends string = string,
  TPage = AnyPage,
> = RouteViewEntry<P, N, TPage>;

/** @deprecated Use LayoutViewEntry */
export type LayoutRouteEntry<
  P extends string = string,
  N extends string = string,
> = LayoutViewEntry<P, N>;

export type RouteTreeEntry<P extends string = string, N extends string = string> =
  | RouteViewEntry<P, N, AnyPage>
  | RedirectRouteEntry<P, N>
  | LayoutViewEntry<P, N>;
