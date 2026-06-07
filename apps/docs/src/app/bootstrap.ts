import { createEchoApp } from '@echojs-ecosystem/framework/app'

import { bindDocsHeaderScroll } from '@app/docs-header-scroll'
import {
  bindMobileNavCloseOnNavigate,
  bindMobileScrollLock,
} from '@app/mobile-scroll-lock'
import { routerProvider } from '@app/router-provider'
import {
  i18nProvider,
  queryProvider,
  themeProvider,
  uiProvider,
} from '@core/providers'

bindMobileScrollLock()
bindMobileNavCloseOnNavigate()
bindDocsHeaderScroll()

export const bootstrap = (): Promise<() => void> =>
  createEchoApp({
    strictContextChecks: true,
  })
    .use(queryProvider)
    .use(uiProvider)
    .use(i18nProvider)
    .use(themeProvider)
    .use(routerProvider)
    .mount('#app')
