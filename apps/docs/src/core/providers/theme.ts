import { createProvider } from '@echojs-ecosystem/framework/app'

import { initTheme, type ThemeMode } from './theme-store'
import { initAccent } from './accent-store'
import { initDocsFont } from './font-store'
import { initSurfaceTheme } from './surface-theme-store'

export const themeProvider = createProvider({
  name: 'theme',
  setup() {
    initTheme()
    initSurfaceTheme()
    initAccent()
    initDocsFont()
  },
})

export type { ThemeMode }
