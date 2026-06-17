import { code, div, h1, p, pre, section } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { adminLayoutStyles } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

export type WorkspaceSprintTab = 'board' | 'overview' | 'retro'

export const WorkspaceSprintView = ({
  params,
  query,
}: {
  params: { orgId: string; teamId: string; sprintId: string }
  query: { tab?: WorkspaceSprintTab }
}): Child =>
  div({ class: layout.page() }, [
    h1({ class: 'text-2xl font-bold text-fg' }, 'Sprint workspace'),
    p({ class: layout.muted() }, [
      'Deep nesting: ',
      code({ class: layout.code() }, '/org/:orgId/team/:teamId/sprint/:sprintId'),
    ]),
    section({ class: `${layout.card()} mt-4` }, [
      p(null, [
        'org=',
        code({ class: layout.code() }, params.orgId),
        ' team=',
        code({ class: layout.code() }, params.teamId),
        ' sprint=',
        code({ class: layout.code() }, params.sprintId),
        ' tab=',
        code({ class: layout.code() }, query.tab ?? 'board'),
      ]),
    ]),
    pre({ class: 'mt-4 overflow-auto rounded-xl bg-code-bg p-4 text-xs text-stone-200' }, () =>
      JSON.stringify({ params, query }, null, 2),
    ),
  ])
