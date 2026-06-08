import { createLayoutView } from '@echojs-ecosystem/framework/router'
import { code, div, p } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { adminLayoutStyles } from '@widgets/admin-shell/admin-shell.styles'

const layout = adminLayoutStyles()

export const workspaceOrgLayoutPage = createLayoutView({
  name: 'workspace-org-layout',
  view: ({ params, outlet }): Child => {
    const { orgId } = params as { orgId: string }
    return div([
      p({ class: layout.breadcrumbs() }, [
        'Org ',
        code({ class: layout.code() }, orgId),
      ]),
      outlet(),
    ])
  },
})
