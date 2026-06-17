import { createRouterProvider } from '@echojs-ecosystem/framework/router'

import { appRouter } from '@app/router/app.router'

export const routerProvider = createRouterProvider(appRouter)
