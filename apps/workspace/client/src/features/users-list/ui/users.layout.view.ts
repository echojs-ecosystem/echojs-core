import type { RouteView } from '@echojs-ecosystem/framework/router'
import { div } from '@echojs-ecosystem/framework/hyperdom'

import { adminLayoutStyles } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

export const UsersLayoutView: RouteView<unknown, unknown, unknown> = ({ outlet }) =>
  div({ class: layout.page() }, outlet())
