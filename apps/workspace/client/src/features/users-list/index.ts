import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { usersListModel } from './model/users-list.model'
import { UsersListView } from './view/users-list.view'

export const UsersList = createComponent(usersListModel, UsersListView, {
  name: 'UsersList',
})

export { UsersListView } from './view/users-list.view'
export { UsersLayoutView } from './view/users.layout.view'
export type { UsersListVM } from './model/users-list.model'
