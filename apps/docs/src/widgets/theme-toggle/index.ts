import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { createThemeToggleModel } from '@widgets/theme-toggle/model/theme-toggle.model'
import { ThemeToggleView } from '@widgets/theme-toggle/ui/theme-toggle.view'

export const ThemeToggle = createComponent(
  createThemeToggleModel,
  ThemeToggleView,
  {
    name: 'ThemeToggle',
  }
)
