import {
  button,
  type Child,
  createView,
} from '@echojs-ecosystem/framework/hyperdom'

import { MoonIcon, SunIcon } from '@widgets/icons'

import type { ThemeToggleVM } from '../model/theme-toggle.model'
import { themeToggleStyles } from './theme-toggle.view.styles'

export const ThemeToggleView = createView(
  (vm: ThemeToggleVM): Child =>
    button(
      {
        type: 'button',
        class: themeToggleStyles(),
        onClick: vm.toggle,
        'aria-label': 'Toggle color theme',
      },
      () => (vm.isDarkMode() ? SunIcon() : MoonIcon())
    ),
  'ThemeToggleView'
)
