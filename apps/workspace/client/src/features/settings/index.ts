import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { settingsModel } from './model/settings.model'
import { SettingsView } from './view/settings.view'

export const Settings = createComponent(settingsModel, SettingsView, {
  name: 'Settings',
})
