import { createRouteView } from '@echojs-ecosystem/framework/router'

import { AuthLoginView } from '@features/auth-login/index'

export const authLoginPage = createRouteView({
  name: 'auth-login',
  view: AuthLoginView,
})
