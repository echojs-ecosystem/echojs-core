import { createView, type Child } from "@echojs/hyperdom";
import type { AnyPage } from "@echojs/router";
import type { NavIconId } from "@shared/content/nav-icon-id.js";
import { SidebarNavLinkView } from "@widgets/docs-shell/sidebar-nav-link.view.js";

export type AgentNavLinkViewProps = {
  page: AnyPage;
  label: string;
  icon: NavIconId;
  badge?: string;
};

export const AgentNavLinkView = createView((props: AgentNavLinkViewProps): Child => {
  return SidebarNavLinkView({
    page: props.page,
    label: props.label,
    icon: props.icon,
    badge: props.badge,
  });
}, "AgentNavLinkView");
