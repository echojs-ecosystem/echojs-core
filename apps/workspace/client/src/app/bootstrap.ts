import { createEchoApp } from '@echojs-ecosystem/framework/app'

import { i18nProvider } from '@core/i18n/index'
import { permissionProvider } from '@core/permission/index'
import { asyncProvider } from '@core/async/index'
import { themeProvider } from '@core/theme/index'
import { uiProvider } from '@core/ui/index'
import { routerProvider } from '@app/router-provider'

export const bootstrap = (): Promise<() => void> =>
  createEchoApp({
    strictContextChecks: true,
  })
    .use(asyncProvider)
    .use(uiProvider)
    .use(i18nProvider)
    .use(themeProvider)
    .use(permissionProvider)
    .use(routerProvider)
    .mount('#app')
