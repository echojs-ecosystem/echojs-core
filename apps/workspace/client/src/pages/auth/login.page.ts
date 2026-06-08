import { createRouteView } from '@echojs-ecosystem/framework/router'

import { AuthLoginView } from './ui/login.view'

export const authLoginPage = createRouteView({
  name: 'auth-login',
  view: AuthLoginView,
})
