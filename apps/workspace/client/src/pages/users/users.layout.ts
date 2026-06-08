import { createLayoutView } from '@echojs-ecosystem/framework/router'
import { div } from '@echojs-ecosystem/framework/hyperdom'

import { adminLayoutStyles } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

export const usersLayoutPage = createLayoutView({
  name: 'users-layout',
  view: ({ outlet }) => div({ class: layout.page() }, outlet()),
})
