import { createLayoutView } from '@echojs-ecosystem/framework/router'

import { apiHealthQuery } from '@core/api/index'
import { AdminLayoutView } from '@widgets/admin-shell/index'

export const adminLayoutPage = createLayoutView({
  name: 'admin-layout',
  beforeLoad: () => {
    void apiHealthQuery.with().refetch()
  },
  view: AdminLayoutView,
})
