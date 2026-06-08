import { button, div, p } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { i18n } from '@core/i18n/index'
import { $currentRole, setWorkspaceRole, type WorkspaceRole } from '@entities/session/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

const ROLES: WorkspaceRole[] = ['admin', 'manager', 'viewer']

export const RoleSwitcherView = (): Child =>
  div({ class: 'flex flex-wrap gap-2' }, [
    ...ROLES.map((role) =>
      button(
        {
          type: 'button',
          class: () =>
            $currentRole.value() === role ? layout.btnPrimary() : layout.btn(),
          onClick: () => setWorkspaceRole(role),
        },
        role,
      ),
    ),
    p({ class: `${layout.muted()} w-full` }, () => i18n.t('settings.roleHint')),
  ])
