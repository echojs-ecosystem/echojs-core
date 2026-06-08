import { guardRoute } from '@echojs-ecosystem/framework/router'

import { appPermission } from '@core/permission/index.js'
import { $isLoggedIn } from '@entities/session/index'
import { authLoginPage } from '@pages/auth/index'
import { settingsPage } from '@pages/settings/index'

guardRoute({
  route: settingsPage,
  canOpen: () => $isLoggedIn.value() && appPermission.check('settings.read'),
  otherwise: authLoginPage,
})
