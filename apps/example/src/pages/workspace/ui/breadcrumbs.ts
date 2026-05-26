import { nav } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import type { AnyPage } from "@echojs/router";
import { code, li, NavLink, span, ul } from "@pages/workspace/ui/common.js";

export type BreadcrumbItem = {
  label: string;
  to?: AnyPage;
  params?: Record<string, string>;
  query?: Record<string, string>;
};

export const Breadcrumbs = (items: readonly BreadcrumbItem[]): Child =>
  nav({ class: "router-breadcrumbs", "aria-label": "Breadcrumb" }, [
    ul(null, [
      ...items.flatMap((item, index) => {
        const isLast = index === items.length - 1;
        const cell: Child = isLast
          ? li(null, [span({ class: "router-breadcrumbs__current" }, item.label)])
          : li(null, [
              item.to
                ? NavLink({
                    to: item.to,
                    params: item.params,
                    query: item.query,
                    activeClass: "router-breadcrumbs__active",
                    class: "router-breadcrumbs__link",
                    children: item.label,
                  })
                : span(null, item.label),
              span({ class: "router-breadcrumbs__sep" }, " / "),
            ]);
        return [cell];
      }),
    ]),
  ]);

export const ParamPill = (name: string, value: string): Child =>
  span({ class: "router-param-pill" }, [code(null, name), " = ", code(null, value)]);
