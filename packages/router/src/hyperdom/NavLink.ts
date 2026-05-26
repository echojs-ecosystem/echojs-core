import { cx, h } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { getRouteState } from "../core/route.js";
import type { Route } from "../core/types.js";
import type { QueryRecord } from "../core/query.js";
import type { LinkProps } from "./Link.js";

export type NavLinkProps<Params = Record<string, string>, Query = QueryRecord> = LinkProps<
  Params,
  Query
> & {
  activeClass?: string;
  class?: string;
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
  } = props;

  const resolvedHref = (): string => {
    if (href) return href;
    if (!to) return "#";
    const state = getRouteState(to);
    if (!state.router || !state.pathTemplate) return "#";
    return state.router.resolve(to as import("../core/types.js").AnyRoute, (params ?? {}) as Record<
      string,
      string
    >, { query: query as Record<string, unknown> | undefined });
  };

  const classProp = (): string | undefined => {
    const active = to?.$isOpened.value() ?? false;
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

  return h(
    "a",
    {
      href: resolvedHref,
      class: classProp,
      onClick: to ? onClick : undefined,
    },
    children ?? null,
  );
};
