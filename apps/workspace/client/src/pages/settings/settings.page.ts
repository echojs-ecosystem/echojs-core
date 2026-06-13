import { createRouteView } from '@echojs-ecosystem/framework/router'

import { bootstrapQuery } from '@core/api/index'
import { $currentRole } from '@entities/session/index'
import { Settings } from '@features/settings/index'

export const settingsPage = createRouteView({
  name: 'settings',
  beforeLoad: () => {
    void bootstrapQuery.with({ role: $currentRole.peek() }).refetch()
  },
  view: () => Settings(),
})
