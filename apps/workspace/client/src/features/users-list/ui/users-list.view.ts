import {
  button,
  code,
  div,
  h1,
  input,
  label,
  option,
  p,
  section,
  select,
  Show,
  span,
  table,
  tbody,
  td,
  th,
  thead,
  tr,
} from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'
import type { AdminUser, AdminUserStatus } from '@echojs-ecosystem/workspace-shared'

import { appPermission } from '@core/permission/index.js'
import { newUserPermissionSubject } from '@entities/user/index'
import { i18n } from '@core/i18n/index'
import { userCreatePage, userDetailPage, userEditPage } from '@app/router/index'
import { USER_TAGS } from '@entities/user/index'
import { usersQueryParams } from '../model/users-filters'
import { deleteUser, usersList } from '../model/users-list.model'
import { adminLayoutStyles, TableSectionHeader } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

const COUNTRIES = ['US', 'DE', 'FR', 'GB', 'JP', 'BR', 'IN', 'RU', 'CA', 'AU'] as const

const statusBadgeClass = (status: AdminUserStatus): string => {
  if (status === 'active') return layout.badgeActive()
  if (status === 'invited') return layout.badgeInvited()
  return layout.badgeSuspended()
}

const formatDate = (value: string): string =>
  new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))

export const UsersListView = (): Child => {
  const response = usersList.data()
  const filters = usersQueryParams.value()
  const pendingAction = () => deleteUser.isPending()

  const toggleTag = (tag: string): void => {
    const current = usersQueryParams.value().tag
    const next = current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]
    usersQueryParams.set({ tag: next, page: 1 })
  }

  const handleDelete = (user: AdminUser): void => {
    if (!appPermission.check('user.delete', user)) return
    if (!window.confirm(i18n.t('users.deleteConfirm', { name: user.name }))) return
    void deleteUser.run({ id: user.id })
  }

  return div({ class: layout.page() }, [
    div({ class: layout.toolbar() }, [
      div([
        h1({ class: 'text-2xl font-bold text-fg' }, () => i18n.t('users.title')),
        p({ class: layout.muted() }, [
          () => i18n.t('users.lead'),
          ' • ',
          code({ class: layout.code() }, () => usersList.status()),
        ]),
      ]),
      div({ class: layout.toolbarActions() }, [
        button(
          {
            type: 'button',
            class: layout.btn(),
            onClick: () => usersQueryParams.reset(),
          },
          () => i18n.t('users.resetFilters'),
        ),
      ]),
    ]),
    section({ class: `${layout.filterBar()} mb-4` }, [
      div({ class: 'grid min-w-[220px] flex-1 gap-1' }, [
        label({ class: layout.muted() }, () => i18n.t('users.search')),
        input({
          class: layout.input(),
          value: filters.q,
          placeholder: 'name, email, id…',
          onInput: (e: { currentTarget: HTMLInputElement }) =>
            usersQueryParams.set({ q: e.currentTarget.value, page: 1 }),
        }),
      ]),
      div({ class: 'grid min-w-[140px] gap-1' }, [
        label({ class: layout.muted() }, () => i18n.t('users.role')),
        select({
          class: layout.select(),
          value: filters.role,
          onChange: (e: { currentTarget: HTMLSelectElement }) =>
            usersQueryParams.set({ role: e.currentTarget.value as typeof filters.role, page: 1 }),
        }, [
          option({ value: 'all' }, 'all'),
          option({ value: 'admin' }, 'admin'),
          option({ value: 'manager' }, 'manager'),
          option({ value: 'editor' }, 'editor'),
          option({ value: 'viewer' }, 'viewer'),
        ]),
      ]),
      div({ class: 'grid min-w-[140px] gap-1' }, [
        label({ class: layout.muted() }, () => i18n.t('users.status')),
        select({
          class: layout.select(),
          value: filters.status,
          onChange: (e: { currentTarget: HTMLSelectElement }) =>
            usersQueryParams.set({ status: e.currentTarget.value as typeof filters.status, page: 1 }),
        }, [
          option({ value: 'all' }, 'all'),
          option({ value: 'active' }, 'active'),
          option({ value: 'invited' }, 'invited'),
          option({ value: 'suspended' }, 'suspended'),
        ]),
      ]),
      div({ class: 'grid min-w-[150px] gap-1' }, [
        label({ class: layout.muted() }, () => i18n.t('users.department')),
        select({
          class: layout.select(),
          value: filters.department,
          onChange: (e: { currentTarget: HTMLSelectElement }) =>
            usersQueryParams.set({
              department: e.currentTarget.value as typeof filters.department,
              page: 1,
            }),
        }, [
          option({ value: 'all' }, 'all'),
          option({ value: 'engineering' }, 'engineering'),
          option({ value: 'sales' }, 'sales'),
          option({ value: 'support' }, 'support'),
          option({ value: 'marketing' }, 'marketing'),
          option({ value: 'ops' }, 'ops'),
        ]),
      ]),
      div({ class: 'grid min-w-[120px] gap-1' }, [
        label({ class: layout.muted() }, () => i18n.t('users.verified')),
        select({
          class: layout.select(),
          value: filters.verified,
          onChange: (e: { currentTarget: HTMLSelectElement }) =>
            usersQueryParams.set({
              verified: e.currentTarget.value as typeof filters.verified,
              page: 1,
            }),
        }, [
          option({ value: 'all' }, 'all'),
          option({ value: 'true' }, 'verified'),
          option({ value: 'false' }, 'unverified'),
        ]),
      ]),
      div({ class: 'grid min-w-[100px] gap-1' }, [
        label({ class: layout.muted() }, () => i18n.t('users.country')),
        select({
          class: layout.select(),
          value: filters.country,
          onChange: (e: { currentTarget: HTMLSelectElement }) =>
            usersQueryParams.set({ country: e.currentTarget.value, page: 1 }),
        }, [
          option({ value: '' }, 'all'),
          ...COUNTRIES.map((country) => option({ value: country }, country)),
        ]),
      ]),
      div({ class: 'grid min-w-[140px] gap-1' }, [
        label({ class: layout.muted() }, () => i18n.t('users.sort')),
        select({
          class: layout.select(),
          value: `${filters.sort}:${filters.order}`,
          onChange: (e: { currentTarget: HTMLSelectElement }) => {
            const [sort, order] = e.currentTarget.value.split(':') as [typeof filters.sort, typeof filters.order]
            usersQueryParams.set({ sort, order, page: 1 })
          },
        }, [
          option({ value: 'name:asc' }, 'name ↑'),
          option({ value: 'name:desc' }, 'name ↓'),
          option({ value: 'email:asc' }, 'email ↑'),
          option({ value: 'email:desc' }, 'email ↓'),
          option({ value: 'createdAt:desc' }, 'created ↓'),
          option({ value: 'lastActiveAt:desc' }, 'last active ↓'),
        ]),
      ]),
      div({ class: 'grid min-w-[100px] gap-1' }, [
        label({ class: layout.muted() }, () => i18n.t('users.pageSize')),
        select({
          class: layout.select(),
          value: String(filters.pageSize),
          onChange: (e: { currentTarget: HTMLSelectElement }) =>
            usersQueryParams.set({ pageSize: Number(e.currentTarget.value), page: 1 }),
        }, [
          option({ value: '8' }, '8'),
          option({ value: '12' }, '12'),
          option({ value: '24' }, '24'),
          option({ value: '48' }, '48'),
        ]),
      ]),
      div({ class: 'flex min-w-full flex-wrap gap-2 pt-1' }, [
        ...USER_TAGS.map((tag) =>
          button(
            {
              type: 'button',
              class: layout.btn(),
              onClick: () => toggleTag(tag),
            },
            filters.tag.includes(tag) ? `✓ ${tag}` : tag,
          ),
        ),
      ]),
    ]),
    section({ class: layout.card() }, [
      usersList.isPending()
        ? p({ class: layout.muted() }, () => i18n.t('users.loading'))
        : [
            TableSectionHeader({
              title: () => i18n.t('users.tableTitle'),
              count: () => response?.total ?? 0,
              createTo: userCreatePage,
              createLabel: () => i18n.t('users.create'),
              canCreate: () => appPermission.check('user.update', newUserPermissionSubject),
            }),
            div({ class: layout.tableWrap() }, [
              table({ class: layout.table() }, [
              thead([
                tr([
                  th({ class: layout.th() }, () => i18n.t('users.colName')),
                  th({ class: layout.th() }, () => i18n.t('users.colEmail')),
                  th({ class: layout.th() }, () => i18n.t('users.colRole')),
                  th({ class: layout.th() }, () => i18n.t('users.colDepartment')),
                  th({ class: layout.th() }, () => i18n.t('users.colStatus')),
                  th({ class: layout.th() }, () => i18n.t('users.colCountry')),
                  th({ class: layout.th() }, () => i18n.t('users.colTags')),
                  th({ class: layout.th() }, () => i18n.t('users.colLastActive')),
                  th({ class: layout.th() }, () => i18n.t('users.colActions')),
                ]),
              ]),
              tbody(
                (response?.items ?? []).map((user) =>
                  tr([
                    td({ class: layout.td() }, [
                      NavLink({
                        to: userDetailPage,
                        params: { id: user.id },
                        class: 'font-medium text-fg hover:text-echo-700 dark:hover:text-echo-300',
                        children: user.name,
                      }),
                      p({ class: 'text-xs text-fg-subtle' }, user.id),
                    ]),
                    td({ class: layout.td() }, user.email),
                    td({ class: layout.td() }, [
                      span({ class: layout.badge() }, user.role),
                      user.verified
                        ? span({ class: `${layout.badge()} ml-1 ${layout.badgeActive()}` }, '✓')
                        : null,
                    ]),
                    td({ class: layout.td() }, user.department),
                    td({ class: layout.td() }, [
                      span({ class: `${layout.badge()} ${statusBadgeClass(user.status)}` }, user.status),
                    ]),
                    td({ class: layout.td() }, user.country),
                    td({ class: layout.td() }, [
                      div({ class: 'flex max-w-[180px] flex-wrap gap-1' }, [
                        ...user.tags.map((tag) => span({ class: layout.badge() }, tag)),
                      ]),
                    ]),
                    td({ class: layout.td() }, formatDate(user.lastActiveAt)),
                    td({ class: layout.td() }, [
                      div({ class: layout.rowActions() }, [
                        Show(
                          () => appPermission.check('user.update', user),
                          () =>
                            NavLink({
                              to: userEditPage,
                              params: { id: user.id },
                              class: layout.btn(),
                              children: () => i18n.t('users.edit'),
                            }),
                        ),
                        Show(
                          () => appPermission.check('user.delete', user),
                          () =>
                            button(
                              {
                                type: 'button',
                                class: layout.btnDanger(),
                                disabled: pendingAction(),
                                onClick: () => handleDelete(user),
                              },
                              () => i18n.t('users.delete'),
                            ),
                        ),
                      ]),
                    ]),
                  ]),
                ),
              ),
              ]),
            ]),
          ],
      p({ class: `${layout.muted()} mt-4` }, () =>
        i18n.t('users.pagination', {
          page: String(response?.page ?? 1),
          totalPages: String(response?.totalPages ?? 1),
          total: String(response?.total ?? 0),
        }),
      ),
      div({ class: 'mt-3 flex flex-wrap gap-2' }, [
        button(
          {
            type: 'button',
            class: layout.btn(),
            onClick: () => usersQueryParams.set({ page: Math.max(1, (response?.page ?? 1) - 1) }),
          },
          '←',
        ),
        button(
          {
            type: 'button',
            class: layout.btn(),
            onClick: () =>
              usersQueryParams.set({
                page: Math.min(response?.totalPages ?? 1, (response?.page ?? 1) + 1),
              }),
          },
          '→',
        ),
      ]),
    ]),
  ])
}
