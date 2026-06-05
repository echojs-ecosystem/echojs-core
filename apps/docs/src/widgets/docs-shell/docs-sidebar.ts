import { NavLink } from "@echojs/router/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { aside, div, nav, p, Show, span } from "@echojs/hyperdom";
import { $mobileNavOpen } from "@shared/layout/mobile-nav.js";
import { sidebarScrollRef } from "@shared/layout/sidebar-scroll.js";
import { agentsNavItems, agentsNavSection, docsNavSections } from "@shared/content/nav.js";
import { packageNavGroups } from "@shared/content/package-nav.js";
import { resolveNavIcon, resolveNavIconClass } from "@shared/content/resolve-nav-icon.js";
import {
  sidebarQuickLinks,
  sidebarResourceLinks,
  type SidebarLink,
} from "@shared/content/sidebar-extras.js";
import { docPageByContentId } from "@app/router/doc-pages.js";
import { homePage } from "@app/router/page-links.js";
import { shellStyles, sidebarPanelStyles } from "@widgets/docs-shell/docs-shell.styles.js";
import type { NavIconId } from "@widgets/icons/nav-icon-id.js";
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
      div({ class: shell.sidebarBrand() }, [
        NavLink({
          to: homePage,
          class: shell.sidebarBrandLink(),
          children: [
            span({ class: shell.sidebarBrandMark() }, NavIcon("zap", "h-5 w-5 text-echo-600 dark:text-echo-400")),
            span({ class: shell.sidebarBrandText() }, [
              p({ class: shell.sidebarBrandName() }, "EchoJS"),
              p({ class: shell.sidebarBrandTag() }, "Documentation"),
            ]),
          ],
        }),
      ]),
      nav(
        {
          class: shell.sidebarNav(),
          ref: sidebarScrollRef,
          onclick: closeMobileNavOnLinkClick,
        },
        [
        div({ class: shell.sidebarQuick() }, [
          ...sidebarQuickLinks.map((link) =>
            SidebarNavLinkView({ page: link.page, label: link.label, icon: link.icon }),
          ),
        ]),
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
