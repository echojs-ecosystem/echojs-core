import { h } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { getRouteState } from "../core/route";
import type { Route } from "../core/types";
import type { QueryRecord } from "../core/query";

export type LinkProps<Params = Record<string, string>, Query = QueryRecord> = {
  to?: Route<Params, Query>;
  href?: string;
  params?: Params;
  query?: Query;
  replace?: boolean;
  children?: Child;
};

export const Link = <Params = Record<string, string>, Query = QueryRecord>(
  props: LinkProps<Params, Query>,
): Child => {
  const { to, href, params, query, replace, children } = props;

  const resolvedHref = (): string => {
    if (href) return href;
    if (!to) return "#";
    const state = getRouteState(to);
    if (!state.router || !state.pathTemplate) return "#";
    return state.router.resolve(to as import("../core/types").AnyRoute, (params ?? {}) as Record<
      string,
      string
    >, { query: query as Record<string, unknown> | undefined });
  };

  const onClick = (event: MouseEvent): void => {
    if (!to) return;
    event.preventDefault();
    if (params !== undefined) {
      to.go(params, { query, replace });
    } else {
      to.go(undefined as Params, { query, replace });
    }
  };

  return h(
    "a",
    {
      href: resolvedHref,
      onClick: to ? onClick : undefined,
    },
    children ?? null,
  );
};
