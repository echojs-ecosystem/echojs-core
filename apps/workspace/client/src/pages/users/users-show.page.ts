import { createRouteView } from '@echojs-ecosystem/framework/router'

import { UserDetailView } from '@features/user-detail/index'

export const userDetailPage = createRouteView<
  { id: string },
  { tab?: string }
>({
  name: 'user-detail',
  view: ({ params, query }) => UserDetailView({ params, query }),
})
