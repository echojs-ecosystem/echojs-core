import { div, h1, p } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { dashboardPage } from '@app/router/index'

export const RouterNotFoundView = (): Child =>
  div({ class: 'flex min-h-dvh flex-col items-center justify-center gap-3 p-6' }, [
    h1({ class: 'text-2xl font-bold text-fg' }, '404'),
    p({ class: 'text-fg-muted' }, 'Page not found'),
    NavLink({ to: dashboardPage, class: 'text-echo-700 underline', children: 'Back to dashboard' }),
  ])
