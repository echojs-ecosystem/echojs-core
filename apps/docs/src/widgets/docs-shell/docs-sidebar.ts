import type { Child } from "@echojs-ecosystem/framework/hyperdom";
import { aside, div, nav, p, Show } from "@echojs-ecosystem/framework/hyperdom";
import { $mobileNavOpen } from "@widgets/docs-shell/model/mobile-nav.js";
import { sidebarScrollRef } from "@widgets/docs-shell/helpers/sidebar-scroll.js";
import { agentsNavItems, agentsNavSection, docsNavSections } from "@core/content/nav.js";
import { packageNavGroups } from "@core/content/package-nav.js";
import { resolveNavIcon, resolveNavIconClass } from "@core/content/resolve-nav-icon.js";
import { sidebarResourceLinks, type SidebarLink } from "@widgets/docs-shell/sidebar-extras.js";
import { docPageByContentId } from "@app/router/doc-pages.js";
import { shellStyles, sidebarPanelStyles } from "@widgets/docs-shell/docs-shell.styles.js";
import type { NavIconId } from "@core/content/nav-icon-id.js";
import { NavIcon } from "@widgets/icons/nav-icons.js";
import { AgentNavLinkView } from "@widgets/docs-shell/agent-nav-link.view.js";
import { PackageNavGroupView } from "@widgets/docs-shell/package-nav-group.js";
import { SidebarNavLinkView } from "@widgets/docs-shell/sidebar-nav-link.view.js";

const shell = shellStyles();

const sectionIcons: Record<string, NavIconId> = {
  introduction: "book",
  "getting-started": "rocket",
  architecture: "layers",
  packages: "package",
  comparisons: "scale",
  guides: "compass",
  state: "database",
  examples: "layout-grid",
  api: "api",
  agents: "bot",
  resources: "sparkles",
};

const closeMobileNavOnLinkClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement | null;
  if (target?.closest("a")) $mobileNavOpen.set(false);
};

const sectionNav = (sectionId: string, title: string, children: Child[]): Child[] => {
  const icon = sectionIcons[sectionId];
  return [
    p({ class: shell.sectionTitle() }, [
      icon ? NavIcon(icon, "mr-1.5 inline-flex h-3 w-3 opacity-80") : null,
      title,
    ]),
    ...children,
  ];
};

const resourceLink = (link: SidebarLink): Child => {
  if (link.kind === "external") {
    return SidebarNavLinkView({
      href: link.href,
      label: link.label,
      icon: link.icon,
      external: true,
    });
  }
  return SidebarNavLinkView({
    page: link.page,
    label: link.label,
    icon: link.icon,
  });
};

const SidebarPanel = (): Child =>
  aside(
    {
      class: () => sidebarPanelStyles({ mobileOpen: $mobileNavOpen.value() }),
    },
    [
      nav(
        {
          class: shell.sidebarNav(),
          ref: sidebarScrollRef,
          onclick: closeMobileNavOnLinkClick,
        },
        [
        ...docsNavSections.flatMap((section) => {
          if (section.id === "packages") {
            return sectionNav(
              section.id,
              section.title,
              packageNavGroups.map((group) => PackageNavGroupView(group)),
            );
          }
          return sectionNav(
            section.id,
            section.title,
            section.items.map((item) =>
              SidebarNavLinkView({
                page: docPageByContentId[item.contentId]!,
                label: item.title,
                icon: resolveNavIcon(item.contentId, item.slug),
                iconClassName:
                  section.id === "comparisons"
                    ? resolveNavIconClass(item.contentId)
                    : undefined,
              }),
            ),
          );
        }),
        div({ class: shell.agentsDivider() }),
        ...sectionNav(
          agentsNavSection.id,
          agentsNavSection.title,
          agentsNavItems.map((item) =>
            AgentNavLinkView({
              page: docPageByContentId[item.contentId]!,
              label: item.title,
              badge: item.badge,
              icon: resolveNavIcon(item.contentId, item.slug),
            }),
          ),
        ),
        div({ class: shell.sidebarResources() }, [
          ...sectionNav("resources", "Resources", sidebarResourceLinks.map(resourceLink)),
        ]),
      ],
      ),
    ],
  );

export const DocsSidebar = (): Child =>
  div({ class: shell.sidebarWrap() }, [
    Show(
      () => $mobileNavOpen.value(),
      () =>
        div({
          class: shell.overlay(),
          onClick: () => $mobileNavOpen.set(false),
        }),
    ),
    SidebarPanel(),
  ]);
