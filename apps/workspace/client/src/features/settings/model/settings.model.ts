import { createModel } from '@echojs-ecosystem/framework/hyperdom'

import { bootstrapQuery } from '@core/api/index'
import { $currentRole } from '@entities/session/index'

export const createSettingsModel = createModel(() => {
  const bootstrap = bootstrapQuery.with(() => ({ role: $currentRole.value() }))

  return {
    bootstrap,
    bootstrapData: () => bootstrap.data(),
    bootstrapStatus: () => bootstrap.status(),
  }
}, 'SettingsModel')

export type SettingsVM = ReturnType<typeof createSettingsModel>
