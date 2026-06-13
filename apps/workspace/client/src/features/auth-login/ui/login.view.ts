import { button, div, h1, input, label, p, section } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { dashboardPage } from '@app/router/index'
import { i18n } from '@core/i18n/index'
import { mockLogin } from '@entities/session/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

export const AuthLoginView = (): Child =>
  div({ class: `${layout.page()} flex min-h-[70vh] items-center justify-center` }, [
    section({ class: `${layout.card()} w-full max-w-md` }, [
      h1({ class: 'text-xl font-bold text-fg' }, () => i18n.t('auth.title')),
      p({ class: layout.muted() }, () => i18n.t('auth.lead')),
      div({ class: 'mt-4 grid gap-3' }, [
        label({ class: 'grid gap-1 text-sm' }, [
          i18n.t('auth.email'),
          input({
            class: 'rounded-lg border border-border bg-surface px-3 py-2',
            type: 'email',
            value: 'admin@echo.dev',
          }),
        ]),
        label({ class: 'grid gap-1 text-sm' }, [
          i18n.t('auth.password'),
          input({
            class: 'rounded-lg border border-border bg-surface px-3 py-2',
            type: 'password',
            value: 'demo',
          }),
        ]),
        button(
          {
            type: 'button',
            class: layout.btnPrimary(),
            onClick: () => {
              mockLogin({ email: 'admin@echo.dev', password: 'demo', name: 'Admin' })
              dashboardPage.go()
            },
          },
          () => i18n.t('auth.submit'),
        ),
      ]),
    ]),
  ])
