import {
  button,
  code,
  div,
  h1,
  p,
  section,
  Show,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { appPermission } from '@core/permission/index.js'
import { i18n } from '@core/i18n/index'
import { userEditPage, usersListPage } from '@app/router/index'
import { routeUserDetail, syncRouteUserId } from '@entities/user/index'
import {
  activateUser,
  deleteUser,
  suspendUser,
} from '../model/user-detail.model'
import { adminLayoutStyles } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

const formatDate = (value: string): string =>
  new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))

export const UserDetailView = (props: {
  params: { id: string }
  query: { tab?: string }
}): Child => {
  syncRouteUserId(props.params.id)

  const userQuery = routeUserDetail
  const user = userQuery.data()
  const pending = () => suspendUser.isPending() || activateUser.isPending() || deleteUser.isPending()

  if (userQuery.isPending()) {
    return div({ class: layout.page() }, p({ class: layout.muted() }, () => i18n.t('users.loading')))
  }

  if (!user) {
    return div({ class: layout.page() }, p({ class: layout.muted() }, () => i18n.t('users.notFound')))
  }

  const handleDelete = (): void => {
    if (!appPermission.check('user.delete', user)) return
    if (!window.confirm(i18n.t('users.deleteConfirm', { name: user.name }))) return
    void deleteUser.run({ id: user.id }).then(() => usersListPage.go())
  }

  return div({ class: layout.page() }, [
    div({ class: layout.breadcrumbs() }, [
      NavLink({ to: usersListPage, class: layout.muted(), children: () => i18n.t('nav.users') }),
      p({ class: layout.breadcrumbSep() }, '/'),
      p({ class: layout.breadcrumbActive() }, user.name),
      p({ class: layout.breadcrumbSep() }, '•'),
      p(null, [`tab=`, code({ class: layout.code() }, String(props.query.tab ?? 'profile'))]),
    ]),
    div({ class: layout.toolbar() }, [
      h1({ class: 'text-2xl font-bold text-fg' }, user.name),
      div({ class: layout.toolbarActions() }, [
        Show(
          () => appPermission.check('user.update', user),
          () =>
            NavLink({
              to: userEditPage,
              params: { id: user.id },
              class: layout.btnPrimary(),
              children: () => i18n.t('users.edit'),
            }),
        ),
        Show(
          () => user.status !== 'suspended' && appPermission.check('user.update', user),
          () =>
            button(
              {
                type: 'button',
                class: layout.btn(),
                disabled: pending(),
                onClick: () => void suspendUser.run({ id: user.id }),
              },
              () => i18n.t('users.suspend'),
            ),
        ),
        Show(
          () => user.status === 'suspended' && appPermission.check('user.update', user),
          () =>
            button(
              {
                type: 'button',
                class: layout.btnPrimary(),
                disabled: pending(),
                onClick: () => void activateUser.run({ id: user.id }),
              },
              () => i18n.t('users.activate'),
            ),
        ),
        Show(
          () => appPermission.check('user.delete', user),
          () =>
            button(
              {
                type: 'button',
                class: layout.btnDanger(),
                disabled: pending(),
                onClick: handleDelete,
              },
              () => i18n.t('users.delete'),
            ),
        ),
      ]),
    ]),
    section({ class: layout.card() }, [
      div({ class: 'grid gap-3 sm:grid-cols-2' }, [
        p({ class: layout.muted() }, [`Email: `, code({ class: layout.code() }, user.email)]),
        p({ class: layout.muted() }, [`Role: `, code({ class: layout.code() }, user.role)]),
        p({ class: layout.muted() }, [`Status: `, code({ class: layout.code() }, user.status)]),
        p({ class: layout.muted() }, [`Department: `, code({ class: layout.code() }, user.department)]),
        p({ class: layout.muted() }, [`Country: `, code({ class: layout.code() }, user.country)]),
        p({ class: layout.muted() }, [
          'Verified: ',
          span({ class: user.verified ? layout.badgeActive() : layout.badgeSuspended() }, String(user.verified)),
        ]),
        p({ class: layout.muted() }, [`Created: `, formatDate(user.createdAt)]),
        p({ class: layout.muted() }, [`Last active: `, formatDate(user.lastActiveAt)]),
      ]),
      div({ class: 'mt-4 flex flex-wrap gap-2' }, user.tags.map((tag) => span({ class: layout.badge() }, tag))),
      p({ class: `${layout.muted()} mt-4` }, () => `Query: ${userQuery.status()} / ${userQuery.fetchStatus()}`),
    ]),
  ])
}
