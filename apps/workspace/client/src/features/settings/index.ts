import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { createSettingsModel } from './model/settings.model'
import { SettingsView } from './ui/settings.view'

export const Settings = createComponent(createSettingsModel, SettingsView, {
  name: 'Settings',
})
