import type { GuardRouteOptions } from '@echojs-ecosystem/framework/router'

import { appPermission } from '@core/permission/index.js'
import { $isLoggedIn } from '@entities/session/index'
import { adminLayoutPage } from '@pages/admin/index'
import { authLoginPage } from '@pages/auth/index'
import { dashboardPage } from '@pages/dashboard/index'
import { settingsPage } from '@pages/settings/index'

export const appGuards: GuardRouteOptions[] = [
  {
    route: adminLayoutPage,
    canOpen: () => $isLoggedIn.value(),
    otherwise: authLoginPage,
  },
  {
    route: authLoginPage,
    canOpen: () => !$isLoggedIn.value(),
    otherwise: dashboardPage,
  },
  {
    route: settingsPage,
    canOpen: () => $isLoggedIn.value() && appPermission.check('settings.read'),
    otherwise: authLoginPage,
  },
]
