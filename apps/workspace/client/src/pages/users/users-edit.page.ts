import { createRouteView } from '@echojs-ecosystem/framework/router'

import { UserEditView } from '@features/user-edit/index'

export const userEditPage = createRouteView<{ id: string }>({
  name: 'user-edit',
  view: ({ params }) => UserEditView({ params }),
})
