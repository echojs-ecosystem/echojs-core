import {
  aside,
  type Child,
  div,
  nav,
  p,
  Show,
} from '@echojs-ecosystem/framework/hyperdom'

import { docPageByContentId } from '@app/router'
import { AgentNavLinkView } from '@widgets/docs-shell/agent-nav-link.view.js'
import {
  shellStyles,
  sidebarPanelStyles,
} from '@widgets/docs-shell/docs-shell.styles.js'
import { $mobileNavOpen } from '@widgets/docs-shell/model/mobile-nav.js'
import { PackageNavGroupView } from '@widgets/docs-shell/package-nav-group.js'
import {
  sidebarResourceLinks,
  type SidebarLink,
} from '@widgets/docs-shell/sidebar-extras.js'
import { SidebarNavLinkView } from '@widgets/docs-shell/sidebar-nav-link.view.js'
import {
  agentsNavItems,
  agentsNavSection,
  docsNavSections,
} from '@core/content/nav.js'
import { packageNavGroups } from '@core/content/package-nav.js'
import {
  resolveNavIcon,
  resolveNavIconClass,
} from '@core/content/resolve-nav-icon.js'

const shell = shellStyles()

const sectionsWithoutItemIcons = new Set(['api'])

const closeMobileNavOnLinkClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement | null
  if (target?.closest('a')) $mobileNavOpen.set(false)
}

const sectionNav = (
  _sectionId: string,
  title: string,
  children: Child[]
): Child[] => [p({ class: shell.sectionTitle() }, title), ...children]

const resourceLink = (link: SidebarLink): Child => {
  if (link.kind === 'external') {
    return SidebarNavLinkView({
      href: link.href,
      label: link.label,
      icon: link.icon,
      external: true,
    })
  }
  return SidebarNavLinkView({
    page: link.page,
    label: link.label,
    icon: link.icon,
    match: link.kind === 'page' ? link.match : undefined,
  })
}

const SidebarPanel = (): Child =>
  aside(
    {
      class: () => sidebarPanelStyles({ mobileOpen: $mobileNavOpen.value() }),
    },
    [
      nav(
        {
          class: shell.sidebarNav(),
          onClick: closeMobileNavOnLinkClick,
        },
        [
          ...docsNavSections.flatMap((section) => {
            if (section.id === 'packages') {
              const featured = packageNavGroups.filter((g) => g.featured)
              const modules = packageNavGroups.filter((g) => !g.featured)
              return sectionNav(section.id, section.title, [
                ...featured.map((group) => PackageNavGroupView(group)),
                modules.length > 0
                  ? p(
                      { class: shell.packageModulesDivider() },
                      'Ecosystem modules'
                    )
                  : null,
                ...modules.map((group) => PackageNavGroupView(group)),
              ])
            }
            return sectionNav(
              section.id,
              section.title,
              section.items.map((item) =>
                SidebarNavLinkView({
                  page: docPageByContentId[item.contentId]!,
                  label: item.title,
                  ...(sectionsWithoutItemIcons.has(section.id)
                    ? {}
                    : {
                        icon: resolveNavIcon(item.contentId, item.slug),
                        iconClassName:
                          section.id === 'comparisons'
                            ? resolveNavIconClass(item.contentId)
                            : undefined,
                      }),
                })
              )
            )
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
              })
            )
          ),
          div({ class: shell.sidebarResources() }, [
            ...sectionNav(
              'resources',
              'Resources',
              sidebarResourceLinks.map(resourceLink)
            ),
          ]),
        ]
      ),
    ]
  )

export const DocsSidebar = (): Child =>
  div({ class: shell.sidebarWrap() }, [
    Show(
      () => $mobileNavOpen.value(),
      () =>
        div({
          class: shell.overlay(),
          onClick: () => $mobileNavOpen.set(false),
        })
    ),
    SidebarPanel(),
  ])
