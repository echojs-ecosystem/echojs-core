import type { RouteView } from '@echojs-ecosystem/framework/router'
import { div, main } from '@echojs-ecosystem/framework/hyperdom'

import { adminLayoutStyles } from '../admin-shell.styles'
import { AdminHeaderView } from './admin-header.view'
import { AdminSidebarView } from './admin-sidebar.view'

const layout = adminLayoutStyles()

export const AdminLayoutView: RouteView<unknown, unknown, unknown> = ({ outlet }) =>
  div({ class: layout.shell() }, [
    AdminSidebarView(),
    div({ class: layout.shellMain() }, [
      AdminHeaderView(),
      main({ class: layout.shellContent() }, () => outlet()),
    ]),
  ])
