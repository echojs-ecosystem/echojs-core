import type { RouteView } from '@echojs-ecosystem/framework/router'
import { code, div, p } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { adminLayoutStyles } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

export const WorkspaceTeamLayoutView: RouteView<unknown, unknown, unknown> = ({ params, outlet }) => {
  const { teamId } = params as { teamId: string }

  return div([
    p({ class: layout.muted() }, ['Team ', code({ class: layout.code() }, teamId)]),
    outlet(),
  ])
}
