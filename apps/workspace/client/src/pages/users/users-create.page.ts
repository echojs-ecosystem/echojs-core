import { createRouteView } from '@echojs-ecosystem/framework/router'

import { UserCreateView } from '@features/user-create/index'

export const userCreatePage = createRouteView({
  name: 'user-create',
  view: UserCreateView,
})
