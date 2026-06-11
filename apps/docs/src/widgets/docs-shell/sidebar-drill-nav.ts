import {
  button,
  type Child,
  div,
  h,
  p,
  Show,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'
import type { AnyPage } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import { appRouter } from '@app/router/router'
import { drillSidebarStyles } from '@widgets/docs-shell/docs-shell.styles'
import { closeMobileNav } from '@widgets/docs-shell/model/mobile-nav'
import {
  $sidebarDrillStack,
  sidebarDrillBack,
  sidebarDrillOpenPackage,
  sidebarPreparePackageOverviewNav,
} from '@widgets/docs-shell/model/sidebar-drill-stack'
import {
  sidebarResourceLinks,
  type SidebarLink,
} from '@widgets/docs-shell/sidebar-extras'
import { NavIcon } from '@widgets/icons'
import type { NavIconId } from '@core/content/nav-icon-id'
import {
  agentsNavItems,
  agentsNavSection,
  docsNavSections,
} from '@core/content/nav'
import {
  isPackageNavLabel,
  isPackageNavSubsection,
  packageNavGroups,
  type PackageNavChild,
  type PackageNavGroup,
} from '@core/content/package-nav'
import {
  resolveNavIcon,
  resolveNavIconClass,
  resolvePackageGroupIcon,
} from '@core/content/resolve-nav-icon'
import type { ContentId, DocsNavItem } from '@core/content/types'
import { cn } from '@core/styles/cn'

const drill = drillSidebarStyles()

const rowChevron = (): Child =>
  span({ class: drill.chevronSlot() }, [
    NavIcon('chevron-right', drill.chevronIcon()),
  ])

const rowSpacer = (): Child => span({ class: drill.chevronSlot() })

const DrillPageLink = (props: {
  page: AnyPage
  label: string
  icon?: NavIconId
  iconClassName?: string
  badge?: string
  match?: 'exact' | 'partial'
}): Child =>
  NavLink({
    to: props.page,
    match: props.match,
    activeClass: drill.rowActive(),
    class: drill.row(),
    children: [
      props.icon
        ? span({ class: drill.iconSlot() }, [
            NavIcon(
              props.icon,
              cn(drill.iconGlyph(), props.iconClassName)
            ),
          ])
        : span({ class: drill.iconSlot() }),
      span({ class: drill.label() }, props.label),
      props.badge
        ? span({ class: drill.badge() }, props.badge)
        : rowSpacer(),
    ],
  })

const DrillExternalLink = (props: {
  href: string
  label: string
  icon?: NavIconId
}): Child =>
  h(
    'a',
    {
      href: props.href,
      target: '_blank',
      rel: 'noopener noreferrer',
      class: drill.row(),
    },
    [
      props.icon
        ? span({ class: drill.iconSlot() }, [
            NavIcon(props.icon, drill.iconGlyph()),
          ])
        : span({ class: drill.iconSlot() }),
      span({ class: drill.label() }, props.label),
      span({ class: drill.chevronSlot() }, [
        NavIcon('external', drill.externalIcon()),
      ]),
    ]
  )

const DrillDocLink = (item: DocsNavItem): Child =>
  DrillPageLink({
    page: docPageByContentId[item.contentId]!,
    label: item.title,
    icon: resolveNavIcon(item.contentId, item.slug),
  })

const packageOverviewPage = (packageId: string) =>
  docPageByContentId[`packages/${packageId}` as ContentId]!

const isPackageOverviewActive = (packageId: string): boolean =>
  appRouter.$path.value() === `/docs/packages/${packageId}`

const DrillPackageRow = (group: PackageNavGroup, featured = false): Child => {
  const overviewPage = packageOverviewPage(group.id)

  const row = div({ class: drill.packageRow() }, [
    h(
      'a',
      {
        href: `/docs/packages/${group.id}`,
        class: () =>
          cn(
            drill.row(),
            drill.packageRowMain(),
            featured && drill.rowFeatured(),
            isPackageOverviewActive(group.id) && drill.rowActive()
          ),
        onClick: (event: MouseEvent) => {
          event.preventDefault()
          sidebarPreparePackageOverviewNav()
          closeMobileNav()
          overviewPage.go(undefined)
        },
      },
      [
        span({ class: drill.iconSlot() }, [
          NavIcon(
            resolvePackageGroupIcon(group.id),
            cn(drill.iconGlyph(), featured && drill.iconFeatured())
          ),
        ]),
        span({ class: drill.label() }, [
          group.title,
          featured ? span({ class: drill.featuredBadge() }, 'Start') : null,
        ]),
      ]
    ),
    button(
      {
        type: 'button',
        class: drill.packageRowChevron(),
        'aria-label': `Browse ${group.title} pages`,
        onClick: () => sidebarDrillOpenPackage(group.id),
      },
      rowChevron()
    ),
  ])

  if (!featured) return row
  return div({ class: drill.featuredWrap() }, row)
}

const DrillGroup = (children: Child[]): Child =>
  div({ class: drill.group() }, children)

const DrillSection = (title: string, children: Child[]): Child[] => [
  p({ class: drill.sectionTitle() }, title),
  DrillGroup(children),
]

const DrillGroupLabel = (title: string): Child =>
  p({ class: drill.groupLabel() }, title)

const packageSections = (
  children: PackageNavChild[]
): { label?: string; items: DocsNavItem[] }[] => {
  const sections: { label?: string; items: DocsNavItem[] }[] = []
  let current: { label?: string; items: DocsNavItem[] } = { items: [] }

  const pushCurrent = (): void => {
    if (current.label || current.items.length > 0) sections.push(current)
    current = { items: [] }
  }

  const flatten = (nodes: PackageNavChild[]): DocsNavItem[] => {
    const items: DocsNavItem[] = []
    for (const child of nodes) {
      if (isPackageNavLabel(child)) continue
      if (isPackageNavSubsection(child)) {
        items.push(...flatten(child.children))
        continue
      }
      items.push(child)
    }
    return items
  }

  for (const child of children) {
    if (isPackageNavLabel(child)) {
      pushCurrent()
      current = { label: child.title, items: [] }
      continue
    }
    if (isPackageNavSubsection(child)) {
      pushCurrent()
      current = { label: child.title, items: flatten(child.children) }
      pushCurrent()
      continue
    }
    current.items.push(child)
  }

  pushCurrent()
  return sections
}

const PackageDrillPanel = (group: PackageNavGroup): Child[] => {
  const sections = packageSections(group.children)
  return [
    DrillGroup(
      sections.flatMap((section) => [
        section.label ? DrillGroupLabel(section.label) : null,
        ...section.items.map((item) => DrillDocLink(item)),
      ])
    ),
  ]
}

const RootPackages = (): Child[] =>
  packageNavGroups.map((group) => DrillPackageRow(group, group.featured ?? false))

const RootPanel = (): Child[] =>
  docsNavSections.flatMap((section) => {
    if (section.id === 'packages') {
      return DrillSection(section.title, RootPackages())
    }
    return DrillSection(
      section.title,
      section.items.flatMap((item, index) => {
        const groupLabel =
          item.group &&
          (index === 0 || section.items[index - 1]?.group !== item.group)
            ? DrillGroupLabel(item.group)
            : null
        const link = DrillPageLink({
          page: docPageByContentId[item.contentId]!,
          label: item.title,
          icon: resolveNavIcon(item.contentId, item.slug),
          iconClassName:
            section.id === 'comparisons'
              ? resolveNavIconClass(item.contentId)
              : undefined,
        })
        return groupLabel ? [groupLabel, link] : [link]
      })
    )
  })

const resourceLink = (link: SidebarLink): Child => {
  if (link.kind === 'external') {
    return DrillExternalLink({
      href: link.href,
      label: link.label,
      icon: link.icon,
    })
  }
  return DrillPageLink({
    page: link.page,
    label: link.label,
    icon: link.icon,
    match: link.kind === 'page' ? link.match : undefined,
  })
}

const FooterPanels = (): Child[] => [
  ...DrillSection('Resources', sidebarResourceLinks.map(resourceLink)),
  ...DrillSection(
    agentsNavSection.title,
    agentsNavItems.map((item) =>
      DrillPageLink({
        page: docPageByContentId[item.contentId]!,
        label: item.title,
        icon: resolveNavIcon(item.contentId, item.slug),
        badge: item.badge,
      })
    )
  ),
]

const DrillPackageView = (packageId: string): Child[] => {
  const group = packageNavGroups.find((g) => g.id === packageId)
  if (!group) return []

  return [
    button(
      {
        type: 'button',
        class: drill.backRow(),
        onClick: sidebarDrillBack,
      },
      [
        NavIcon('chevron-right', drill.backIcon()),
        span({ class: drill.backLabel() }, group.title),
      ]
    ),
    ...PackageDrillPanel(group),
  ]
}

const DrillRootView = (): Child[] => [...RootPanel(), ...FooterPanels()]

const isPackageDrill = (): boolean => {
  const frame = $sidebarDrillStack.value().at(-1)
  return frame?.type === 'package'
}

const activePackageId = (): string => {
  const frame = $sidebarDrillStack.value().at(-1)
  return frame?.type === 'package' ? frame.packageId : ''
}

export const SidebarDrillNav = (): Child =>
  div({ class: drill.body() }, [
    Show(
      isPackageDrill,
      () => div({ class: drill.panel() }, DrillPackageView(activePackageId())),
      () => div({ class: drill.panel() }, DrillRootView())
    ),
  ])
