import { code, createView, div, h1, p, pre, section } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { appPermission } from '@core/permission/index.js'
import { i18n } from '@core/i18n/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'

import type { SettingsVM } from '../model/settings.model'
import { RoleSwitcherView } from './role-switcher.view'

const layout = adminLayoutStyles()

export const SettingsView = createView((vm: SettingsVM): Child =>
  div({ class: layout.page() }, [
    h1({ class: 'text-2xl font-bold text-fg' }, () => i18n.t('settings.title')),
    p({ class: layout.muted() }, () => i18n.t('permission.guard')),
    section({ class: `${layout.card()} mt-4` }, [
      p({ class: layout.cardTitle() }, () => i18n.t('settings.role')),
      RoleSwitcherView(),
    ]),
    section({ class: `${layout.card()} mt-4` }, [
      p({ class: layout.cardTitle() }, 'Server bootstrap (SSR transfer)'),
      pre({ class: 'overflow-auto text-xs text-fg-muted' }, () =>
        JSON.stringify(vm.data.bootstrapData() ?? { status: vm.state.bootstrapStatus() }, null, 2),
      ),
    ]),
    section({ class: `${layout.card()} mt-4` }, [
      p({ class: layout.cardTitle() }, 'Client permission snapshot'),
      pre({ class: 'overflow-auto text-xs text-fg-muted' }, () =>
        JSON.stringify(appPermission.dehydrate(), null, 2),
      ),
      p({ class: layout.muted() }, [
        'settings.update = ',
        code({ class: layout.code() }, String(appPermission.check('settings.update'))),
      ]),
    ]),
  ]),
  'SettingsView',
)
