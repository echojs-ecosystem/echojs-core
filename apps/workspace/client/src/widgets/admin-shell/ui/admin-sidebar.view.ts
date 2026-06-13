import { aside, div, nav, p } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'
import type { AnyPage } from '@echojs-ecosystem/framework/router'
import {
  catalogVariantPage,
  dashboardPage,
  ordersPage,
  settingsPage,
  usersListPage,
  workspaceSprintPage,
} from '@app/router/index'
import { i18n } from '@core/i18n/index'

import { shellStyles, sidebarPanelStyles } from '../admin-shell.styles'

const shell = shellStyles()

const NavItem = (
  page: AnyPage,
  label: Child,
  opts?: { params?: Record<string, string>; query?: Record<string, string> },
): Child =>
  NavLink({
    to: page,
    params: opts?.params,
    query: opts?.query,
    class: shell.navLink(),
    activeClass: [shell.navLink(), shell.navLinkActive()].join(' '),
    children: label,
  })

export const AdminSidebarView = (): Child =>
  div({ class: shell.sidebarWrap() }, [
    aside({ class: sidebarPanelStyles() }, [
      div({ class: shell.sidebarBrand() }, [
        p({ class: shell.sidebarBrandName() }, () => i18n.t('shell.brand')),
        p({ class: shell.sidebarBrandTag() }, () => i18n.t('shell.tagline')),
      ]),
      nav({ class: shell.sidebarNav() }, [
        p({ class: shell.sectionTitle() }, 'Main'),
        NavItem(dashboardPage, () => i18n.t('nav.dashboard')),
        NavItem(usersListPage, () => i18n.t('nav.users')),
        NavItem(ordersPage, () => i18n.t('nav.orders')),
        p({ class: shell.sectionTitle() }, 'Nested routes'),
        NavItem(workspaceSprintPage, 'Acme / Sprint S24', {
          params: { orgId: 'acme', teamId: 'platform', sprintId: 's24' },
          query: { tab: 'board' },
        }),
        NavItem(catalogVariantPage, 'Catalog / Phone 128GB', {
          params: { categoryId: 'electronics', productId: 'phone', variantId: '128gb' },
          query: { tab: 'specs' },
        }),
        p({ class: shell.sectionTitle() }, 'System'),
        NavItem(settingsPage, () => i18n.t('nav.settings')),
      ]),
    ]),
  ])
