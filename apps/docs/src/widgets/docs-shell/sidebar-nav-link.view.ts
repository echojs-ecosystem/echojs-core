import { createView, type Child } from "@echojs/hyperdom";
import { NavLink } from "@echojs/router/hyperdom";
import type { AnyPage } from "@echojs/router";
import { h, span } from "@echojs/hyperdom";
import { cn } from "@core/styles/cn.js";
import { navLinkStyles, shellStyles } from "@widgets/docs-shell/docs-shell.styles.js";
import type { NavIconId } from "@core/content/nav-icon-id.js";
import { NavIcon } from "@widgets/icons/nav-icons.js";

const shell = shellStyles();

export type SidebarNavLinkProps = {
  label: string;
  icon: NavIconId;
  /** Optional override (e.g. framework brand colors on comparison links). */
  iconClassName?: string;
  badge?: string;
  external?: boolean;
} & (
  | { page: AnyPage }
  | { href: string }
);

const linkInner = (props: SidebarNavLinkProps): Child[] => [
  NavIcon(props.icon, cn(shell.sidebarNavIcon(), props.iconClassName)),
  span({ class: shell.sidebarNavLabel() }, props.label),
  props.badge ? span({ class: shell.sidebarNavBadge() }, props.badge) : null,
  props.external ? NavIcon("external", shell.sidebarNavExternal()) : null,
];

export const SidebarNavLinkView = createView((props: SidebarNavLinkProps): Child => {
  if ("href" in props) {
    return h(
      "a",
      {
        href: props.href,
        target: props.external ? "_blank" : undefined,
        rel: props.external ? "noopener noreferrer" : undefined,
        class: [shell.sidebarExternalLink(), "group"].join(" "),
      },
      linkInner(props),
    );
  }

  return NavLink({
    to: props.page,
    activeClass: navLinkStyles({ active: true, withIcon: true }),
    class: navLinkStyles({ withIcon: true }),
    children: linkInner(props),
  });
}, "SidebarNavLinkView");
