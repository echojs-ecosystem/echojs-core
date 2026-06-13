import { createLayoutView } from '@echojs-ecosystem/framework/router'

import { WorkspaceOrgLayoutView } from '@features/workspace-nested/index'

export const workspaceOrgLayoutPage = createLayoutView({
  name: 'workspace-org-layout',
  view: WorkspaceOrgLayoutView,
})
