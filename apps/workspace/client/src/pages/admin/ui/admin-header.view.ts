import { button, div, header, p, Show } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { authLoginPage } from '@app/router/index'
import { appPermission } from '@core/permission/index.js'
import { apiHealth } from '../model/admin-header.model'
import { $currentRole, $isLoggedIn, $sessionUser, logout } from '@entities/session/index'
import { i18n } from '@core/i18n/index'
import { toggleTheme } from '@core/theme/index'
import { shellStyles } from '@widgets/admin-shell/index'

const shell = shellStyles()

export const AdminHeaderView = (): Child =>
  header({ class: shell.topbar() }, [
    div([
      p({ class: shell.topbarBrand() }, () => i18n.t('shell.brand')),
      p({ class: shell.topbarTag() }, () => i18n.t('shell.tagline')),
    ]),
    div({ class: shell.topbarActions() }, [
      p({ class: 'text-xs text-fg-subtle' }, () =>
        apiHealth.isSuccess()
          ? `API ● ${Math.round((apiHealth.data()?.uptimeMs ?? 0) / 1000)}s`
          : apiHealth.isError()
            ? 'API offline'
            : 'API …',
      ),
      p({ class: 'text-xs text-fg-subtle' }, () => `role: ${$currentRole.value()}`),
      p({ class: 'text-xs text-fg-subtle' }, () => `perm v${appPermission.$version.value()}`),
      button({ type: 'button', class: shell.topbarBtn(), onClick: toggleTheme }, 'Theme'),
      Show(
        () => $isLoggedIn.value(),
        () =>
          button({ type: 'button', class: shell.topbarBtn(), onClick: logout }, () =>
            `Logout (${$sessionUser.value()?.name ?? ''})`,
          ),
        () =>
          NavLink({
            to: authLoginPage,
            class: shell.topbarBtn(),
            children: () => i18n.t('nav.login'),
          }),
      ),
    ]),
  ])
