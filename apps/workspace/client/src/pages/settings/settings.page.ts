import { createRouteView } from '@echojs-ecosystem/framework/router'

import { SettingsView } from './ui/settings.view'

export const settingsPage = createRouteView({
  name: 'settings',
  view: SettingsView,
})
