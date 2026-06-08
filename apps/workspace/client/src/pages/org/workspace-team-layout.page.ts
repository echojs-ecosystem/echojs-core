import { createLayoutView } from '@echojs-ecosystem/framework/router'
import { code, div, p } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { adminLayoutStyles } from '@widgets/admin-shell/admin-shell.styles'

const layout = adminLayoutStyles()

export const workspaceTeamLayoutPage = createLayoutView({
  name: 'workspace-team-layout',
  view: ({ params, outlet }): Child => {
    const { teamId } = params as { teamId: string }
    return div([
      p({ class: layout.muted() }, [
        'Team ',
        code({ class: layout.code() }, teamId),
      ]),
      outlet(),
    ])
  },
})
