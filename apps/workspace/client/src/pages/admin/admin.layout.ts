import { div, main } from '@echojs-ecosystem/framework/hyperdom'
import { createLayoutView } from '@echojs-ecosystem/framework/router'

import { AdminHeaderView } from './ui/admin-header.view'
import { AdminSidebarView } from './ui/admin-sidebar.view'
import { adminLayoutStyles } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

export const adminLayoutPage = createLayoutView({
  name: 'admin-layout',
  view: ({ outlet }) =>
    div({ class: layout.shell() }, [
      AdminSidebarView(),
      div({ class: layout.shellMain() }, [
        AdminHeaderView(),
        main({ class: layout.shellContent() }, () => outlet()),
      ]),
    ]),
})
