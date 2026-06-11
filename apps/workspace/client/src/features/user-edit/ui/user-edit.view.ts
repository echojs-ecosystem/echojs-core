import { bindField } from '@echojs-ecosystem/form'
import { button, div, input, label, option, p, section, select, span } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { userDetailPage } from '@app/router/index'
import { appPermission } from '@core/permission/index.js'
import { routeUserDetail, syncRouteUserId, USER_TAGS } from '@entities/user/index'
import { i18n } from '@core/i18n/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'
import { userEditForm } from '../model/user-edit.form'
import { $userEditError, hydrateUserEditForm, updateUserAction } from '../model/user-edit.model'

const layout = adminLayoutStyles()
const COUNTRIES = ['US', 'DE', 'FR', 'GB', 'JP', 'BR', 'IN', 'RU', 'CA', 'AU'] as const
const fields = userEditForm.fields

const toggleTag = (tag: string): void => {
  const current = fields.tags.value()
  fields.tags.set(current.includes(tag) ? current.filter((item: string) => item !== tag) : [...current, tag])
}

export const UserEditView = (props: { params: { id: string } }): Child => {
  syncRouteUserId(props.params.id)
  const user = routeUserDetail.data()

  if (routeUserDetail.isPending()) {
    return div({ class: layout.page() }, p({ class: layout.muted() }, () => i18n.t('users.loading')))
  }

  if (!user) {
    return div({ class: layout.page() }, p({ class: layout.muted() }, () => i18n.t('users.notFound')))
  }

  if (!appPermission.check('user.update', user)) {
    return div({ class: layout.page() }, p({ class: layout.muted() }, () => i18n.t('permission.denied')))
  }

  hydrateUserEditForm(user)

  return div({ class: layout.page() }, [
    p({ class: layout.breadcrumbs() }, [
      span(null, () => i18n.t('nav.users')),
      span({ class: layout.breadcrumbSep() }, '/'),
      span({ class: layout.breadcrumbActive() }, () => `${i18n.t('users.edit')}: ${user.name}`),
    ]),
    section({ class: `${layout.card()} max-w-3xl` }, [
      p({ class: layout.cardTitle() }, () => `${i18n.t('users.edit')}: ${user.name}`),
      div({ class: 'mt-6 grid gap-4 sm:grid-cols-2' }, [
        div({ class: 'grid gap-1 sm:col-span-2' }, [
          label({ class: layout.muted() }, () => i18n.t('users.colName')),
          input({ class: layout.input(), ...bindField(fields.name) }),
        ]),
        div({ class: 'grid gap-1 sm:col-span-2' }, [
          label({ class: layout.muted() }, () => i18n.t('users.colEmail')),
          input({ type: 'email', class: layout.input(), ...bindField(fields.email) }),
        ]),
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('users.role')),
          select({ class: layout.select(), ...bindField(fields.role) }, [
            option({ value: 'admin' }, 'admin'),
            option({ value: 'manager' }, 'manager'),
            option({ value: 'editor' }, 'editor'),
            option({ value: 'viewer' }, 'viewer'),
          ]),
        ]),
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('users.status')),
          select({ class: layout.select(), ...bindField(fields.status) }, [
            option({ value: 'active' }, 'active'),
            option({ value: 'invited' }, 'invited'),
            option({ value: 'suspended' }, 'suspended'),
          ]),
        ]),
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('users.department')),
          select({ class: layout.select(), ...bindField(fields.department) }, [
            option({ value: 'engineering' }, 'engineering'),
            option({ value: 'sales' }, 'sales'),
            option({ value: 'support' }, 'support'),
            option({ value: 'marketing' }, 'marketing'),
            option({ value: 'ops' }, 'ops'),
          ]),
        ]),
        div({ class: 'grid gap-1' }, [
          label({ class: layout.muted() }, () => i18n.t('users.country')),
          select({ class: layout.select(), ...bindField(fields.country) }, [
            ...COUNTRIES.map((country) => option({ value: country }, country)),
          ]),
        ]),
        label({ class: 'flex items-center gap-2 text-sm text-fg-muted sm:col-span-2' }, [
          input({ type: 'checkbox', ...bindField(fields.verified) }),
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
        $userEditError.value()
          ? p({ class: 'mt-4 text-sm text-red-600 dark:text-red-400' }, () => $userEditError.value() ?? '')
          : null,
      div({ class: 'mt-6 flex flex-wrap gap-2' }, [
        button(
          {
            type: 'button',
            class: layout.btnPrimary(),
            disabled: () => updateUserAction.isPending(),
            onClick: async () => {
              $userEditError.set(null)
              const result = await userEditForm.submit(async (value) => {
                await updateUserAction.run({ id: user.id, input: value })
                userDetailPage.go({ id: user.id })
              })
              if (!result.ok) $userEditError.set(i18n.t('users.saveError'))
            },
          },
          () => (updateUserAction.isPending() ? i18n.t('users.saving') : i18n.t('users.save')),
        ),
        button({ type: 'button', class: layout.btn(), onClick: () => userDetailPage.go({ id: user.id }) }, () =>
          i18n.t('users.cancel'),
        ),
      ]),
    ]),
  ])
}
