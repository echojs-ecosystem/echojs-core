import { createRouteView } from '@echojs-ecosystem/framework/router'

import { UsersList } from '@features/users-list/index'

export const usersListPage = createRouteView({
  name: 'users-list',
  view: () => UsersList(),
})
