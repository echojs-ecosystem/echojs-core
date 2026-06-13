import { createLayoutView } from '@echojs-ecosystem/framework/router'

import { WorkspaceTeamLayoutView } from '@features/workspace-nested/index'

export const workspaceTeamLayoutPage = createLayoutView({
  name: 'workspace-team-layout',
  view: WorkspaceTeamLayoutView,
})
