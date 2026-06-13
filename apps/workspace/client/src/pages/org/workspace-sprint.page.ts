import { createRouteView } from '@echojs-ecosystem/framework/router'

import { WorkspaceSprintView } from '@features/workspace-nested/index'

export const workspaceSprintPage = createRouteView<
  { orgId: string; teamId: string; sprintId: string },
  { tab?: 'board' | 'overview' | 'retro' }
>({
  name: 'workspace-sprint',
  view: ({ params, query }) => WorkspaceSprintView({ params, query }),
})
