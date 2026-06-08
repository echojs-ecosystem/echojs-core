import { cx, h } from "@echojs-ecosystem/hyperdom";
import type { Child } from "@echojs-ecosystem/hyperdom";
import { getRouteState } from "../core/route";
import type { Route } from "../core/types";
import type { QueryRecord } from "../core/query";
import type { LinkProps } from "./Link";
import { isNavLinkActive, type NavLinkMatch } from "./nav-link-active";

export type { NavLinkMatch } from "./nav-link-active";

export type NavLinkProps<Params = Record<string, string>, Query = QueryRecord> = LinkProps<
  Params,
  Query
> & {
  activeClass?: string;
  class?: string;
  /**
   * `exact` — `to.$isOpened` (default).
   * `partial` — route is in the matched chain, or the current path is under `to`'s URL prefix.
   */
  match?: NavLinkMatch;
  /** Also mark active when any of these routes is opened (escape hatch for siblings). */
  activeOn?: readonly Route<any, any>[];
};

export const NavLink = <Params = Record<string, string>, Query = QueryRecord>(
  props: NavLinkProps<Params, Query>,
): Child => {
  const {
    to,
    href,
    params,
    query,
    replace,
    children,
    activeClass = "active",
    class: className,
    match = "exact",
    activeOn,
  } = props;

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

  const activeOptions = () => ({
    match,
    activeOn,
    params: (params ?? {}) as Record<string, string>,
    query: query as QueryRecord | undefined,
  });

  const classProp = (): string | undefined => {
    const active = isNavLinkActive(to, activeOptions());
    return cx(className, active && activeClass);
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

  const ariaCurrent = (): string | undefined =>
    isNavLinkActive(to, activeOptions()) ? "page" : undefined;

  return h(
    "a",
    {
      href: resolvedHref,
      class: classProp,
      "aria-current": ariaCurrent,
      onClick: to ? onClick : undefined,
    },
    children ?? null,
  );
};
