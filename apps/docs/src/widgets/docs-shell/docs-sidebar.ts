import { aside, type Child, div, nav, Show } from '@echojs-ecosystem/framework/hyperdom'

import {
  shellStyles,
  sidebarPanelStyles,
} from '@widgets/docs-shell/docs-shell.styles'
import { $mobileNavOpen } from '@widgets/docs-shell/model/mobile-nav'
import {
  bindSidebarNavEl,
  ensureSidebarDrillRouteSync,
} from '@widgets/docs-shell/model/sidebar-drill-stack'
import { SidebarDrillNav } from '@widgets/docs-shell/sidebar-drill-nav'

const shell = shellStyles()

const closeMobileNavOnLinkClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement | null
  if (target?.closest('a')) $mobileNavOpen.set(false)
}

const SidebarPanel = (): Child =>
  aside(
    {
      class: () =>
        sidebarPanelStyles({ mobileOpen: $mobileNavOpen.value() }),
    },
    [
      nav(
        {
          class: shell.sidebarNav(),
          ref: bindSidebarNavEl,
          onClick: closeMobileNavOnLinkClick,
        },
        SidebarDrillNav()
      ),
    ]
  )

export const DocsSidebar = (): Child => {
  ensureSidebarDrillRouteSync()

  return div({ class: shell.sidebarWrap() }, [
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
}
