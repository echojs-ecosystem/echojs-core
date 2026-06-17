import { createModel } from '@echojs-ecosystem/framework/hyperdom'

import { bootstrapQuery } from '@core/api/index'
import { $currentRole } from '@entities/session/index'

export const settingsModel = createModel(
  () => {
    const bootstrap = bootstrapQuery.with(() => ({ role: $currentRole.value() }))

    return {
      state: {
        bootstrapStatus: () => bootstrap.status(),
      },
      data: {
        bootstrapData: () => bootstrap.data(),
      },
    }
  },
  { name: 'SettingsModel', structExports: true },
)

export type SettingsVM = ReturnType<typeof settingsModel>
