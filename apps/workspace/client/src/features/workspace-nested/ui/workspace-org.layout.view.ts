import type { RouteView } from '@echojs-ecosystem/framework/router'
import { code, div, p } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { adminLayoutStyles } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

export const WorkspaceOrgLayoutView: RouteView<unknown, unknown, unknown> = ({ params, outlet }) => {
  const { orgId } = params as { orgId: string }

  return div([
    p({ class: layout.breadcrumbs() }, ['Org ', code({ class: layout.code() }, orgId)]),
    outlet(),
  ])
}
