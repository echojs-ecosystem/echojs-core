import { bindField } from '@echojs-ecosystem/form'
import { button, div, input, label, option, p, section, select, span } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { userDetailPage, usersListPage } from '@app/router/index'
import { appPermission } from '@core/permission/index.js'
import { USER_TAGS } from '@entities/user/constants/user-tags'
import { newUserPermissionSubject } from '@entities/user/index'
import { i18n } from '@core/i18n/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'
import { $userCreateError, createUserAction } from '../model/user-create.model'
import { userCreateForm } from '../model/user-create.form'

const layout = adminLayoutStyles()
const COUNTRIES = ['US', 'DE', 'FR', 'GB', 'JP', 'BR', 'IN', 'RU', 'CA', 'AU'] as const
const fields = userCreateForm.fields

const toggleTag = (tag: string): void => {
  const current = fields.tags.value()
  fields.tags.set(current.includes(tag) ? current.filter((item: string) => item !== tag) : [...current, tag])
}

export const UserCreateView = (): Child => {
  if (!appPermission.check('user.update', newUserPermissionSubject)) {
    return div({ class: layout.page() }, p({ class: layout.muted() }, () => i18n.t('permission.denied')))
  }

  return div({ class: layout.page() }, [
    p({ class: layout.breadcrumbs() }, [
      span(null, () => i18n.t('nav.users')),
      span({ class: layout.breadcrumbSep() }, '/'),
      span({ class: layout.breadcrumbActive() }, () => i18n.t('users.create')),
    ]),
    section({ class: `${layout.card()} max-w-3xl` }, [
      p({ class: layout.cardTitle() }, () => i18n.t('users.create')),
      p({ class: layout.muted() }, () => i18n.t('users.formLead')),
      div({ class: 'mt-6 grid gap-4 sm:grid-cols-2' }, [
        div({ class: 'grid gap-1 sm:col-span-2' }, [
          label({ class: layout.muted() }, () => i18n.t('users.colName')),
          input({ class: layout.input(), ...bindField(fields.name, { variant: 'text', controlledValue: true }) }),
        ]),
        div({ class: 'grid gap-1 sm:col-span-2' }, [
          label({ class: layout.muted() }, () => i18n.t('users.colEmail')),
          input({ class: layout.input(), ...bindField(fields.email, { variant: 'email', controlledValue: true }) }),
        ]),
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('users.role')),
          select({ class: layout.select(), ...bindField(fields.role, { variant: 'select', controlledValue: true }) }, [
            option({ value: 'admin' }, 'admin'),
            option({ value: 'manager' }, 'manager'),
            option({ value: 'editor' }, 'editor'),
            option({ value: 'viewer' }, 'viewer'),
          ]),
        ]),
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('users.status')),
          select({ class: layout.select(), ...bindField(fields.status, { variant: 'select', controlledValue: true }) }, [
            option({ value: 'active' }, 'active'),
            option({ value: 'invited' }, 'invited'),
            option({ value: 'suspended' }, 'suspended'),
          ]),
        ]),
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('users.department')),
          select({ class: layout.select(), ...bindField(fields.department, { variant: 'select', controlledValue: true }) }, [
            option({ value: 'engineering' }, 'engineering'),
            option({ value: 'sales' }, 'sales'),
            option({ value: 'support' }, 'support'),
            option({ value: 'marketing' }, 'marketing'),
            option({ value: 'ops' }, 'ops'),
          ]),
        ]),
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('users.country')),
          select({ class: layout.select(), ...bindField(fields.country, { variant: 'select', controlledValue: true }) }, [
            ...COUNTRIES.map((country) => option({ value: country }, country)),
          ]),
        ]),
        label({ class: 'flex items-center gap-2 text-sm text-fg-muted sm:col-span-2' }, [
          input({ ...bindField(fields.verified, { variant: 'checkbox' }) }),
          span(null, () => i18n.t('users.verifiedLabel')),
        ]),
        div({ class: 'grid gap-2 sm:col-span-2' }, [
          label({ class: layout.muted() }, 'Tags'),
          div({ class: 'flex flex-wrap gap-2' }, [
            ...USER_TAGS.map((tag) =>
              button(
                { type: 'button', class: layout.btn(), onClick: () => toggleTag(tag) },
                () => (fields.tags.value().includes(tag) ? `✓ ${tag}` : tag),
              ),
            ),
          ]),
        ]),
      ]),
      (): Child =>
        $userCreateError.value()
          ? p({ class: 'mt-4 text-sm text-red-600 dark:text-red-400' }, () => $userCreateError.value() ?? '')
          : null,
      div({ class: 'mt-6 flex flex-wrap gap-2' }, [
        button(
          {
            type: 'button',
            class: layout.btnPrimary(),
            disabled: () => createUserAction.isPending(),
            onClick: async () => {
              $userCreateError.set(null)
              const result = await userCreateForm.submit(async (value) => {
                const payload = await createUserAction.run(value)
                userDetailPage.go({ id: payload.user.id })
              })
              if (!result.ok) return
            },
          },
          () => (createUserAction.isPending() ? i18n.t('users.saving') : i18n.t('users.create')),
        ),
        button({ type: 'button', class: layout.btn(), onClick: () => usersListPage.go() }, () =>
          i18n.t('users.cancel'),
        ),
      ]),
    ]),
  ])
}
