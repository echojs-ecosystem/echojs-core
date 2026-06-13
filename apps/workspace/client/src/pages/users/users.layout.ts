import { createLayoutView } from '@echojs-ecosystem/framework/router'

import { UsersLayoutView } from '@features/users-list/index'

export const usersLayoutPage = createLayoutView({
  name: 'users-layout',
  view: UsersLayoutView,
})
