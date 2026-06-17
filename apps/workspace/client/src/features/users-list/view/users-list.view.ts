import {
  button,
  code,
  createView,
  div,
  h1,
  input,
  label,
  List,
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
import type { AdminUserStatus } from '@echojs-ecosystem/workspace-shared'

import { appPermission } from '@core/permission/index.js'
import { newUserPermissionSubject } from '@entities/user/index'
import { i18n } from '@core/i18n/index'
import { userCreatePage, userDetailPage, userEditPage } from '@app/router/index'
import { adminLayoutStyles, TableSectionHeader } from '@widgets/admin-shell/index'

import type { UsersListVM } from '../model/users-list.model'

const layout = adminLayoutStyles()

const statusBadgeClass = (status: AdminUserStatus): string => {
  if (status === 'active') return layout.badgeActive()
  if (status === 'invited') return layout.badgeInvited()
  return layout.badgeSuspended()
}

const formatDate = (value: string): string =>
  new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))

export const UsersListView = createView((vm: UsersListVM): Child =>
  div({ class: layout.page() }, [
    div({ class: layout.toolbar() }, [
      div([
        h1({ class: 'text-2xl font-bold text-fg' }, () => i18n.t('users.title')),
        p({ class: layout.muted() }, [
          () => i18n.t('users.lead'),
          ' • ',
          code({ class: layout.code() }, () => vm.state.statusText()),
        ]),
      ]),
      div({ class: layout.toolbarActions() }, [
        button(
          {
            type: 'button',
            class: layout.btn(),
            onClick: vm.functions.resetFilters,
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
          value: () => vm.state.q(),
          placeholder: 'name, email, id…',
          onInput: (e: { currentTarget: HTMLInputElement }) =>
            vm.functions.setQ(e.currentTarget.value),
        }),
      ]),
      div({ class: 'grid min-w-[140px] gap-1' }, [
        label({ class: layout.muted() }, () => i18n.t('users.role')),
        select({
          class: layout.select(),
          value: () => vm.state.role(),
          onChange: (e: { currentTarget: HTMLSelectElement }) =>
            vm.functions.setRole(e.currentTarget.value as ReturnType<typeof vm.state.role>),
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
          value: () => vm.state.status(),
          onChange: (e: { currentTarget: HTMLSelectElement }) =>
            vm.functions.setStatus(e.currentTarget.value as ReturnType<typeof vm.state.status>),
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
          value: () => vm.state.department(),
          onChange: (event) =>
            vm.functions.setDepartment(
              event.currentTarget.value as ReturnType<typeof vm.state.department>,
            ),
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
          value: () => vm.state.verified(),
          onChange: (e: { currentTarget: HTMLSelectElement }) =>
            vm.functions.setVerified(e.currentTarget.value as ReturnType<typeof vm.state.verified>),
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
          value: () => vm.state.country(),
          onChange: (e: { currentTarget: HTMLSelectElement }) =>
            vm.functions.setCountry(e.currentTarget.value),
        }, [
          option({ value: '' }, 'all'),
          ...vm.data.userCountries.map((country) => option({ value: country }, country)),
        ]),
      ]),
      div({ class: 'grid min-w-[140px] gap-1' }, [
        label({ class: layout.muted() }, () => i18n.t('users.sort')),
        select({
          class: layout.select(),
          value: () => vm.state.sortOrder(),
          onChange: (e: { currentTarget: HTMLSelectElement }) => {
            const [sort, order] = e.currentTarget.value.split(':') as [
              ReturnType<typeof vm.state.sort>,
              ReturnType<typeof vm.state.order>,
            ]
            vm.functions.setSortOrder(sort, order)
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
          value: () => String(vm.state.pageSize()),
          onChange: (e: { currentTarget: HTMLSelectElement }) =>
            vm.functions.setPageSize(Number(e.currentTarget.value)),
        }, [
          option({ value: '8' }, '8'),
          option({ value: '12' }, '12'),
          option({ value: '24' }, '24'),
          option({ value: '48' }, '48'),
        ]),
      ]),
      div({ class: 'flex min-w-full flex-wrap gap-2 pt-1' }, [
        ...vm.data.userTags.map((tag) =>
          button(
            {
              type: 'button',
              class: layout.btn(),
              onClick: () => vm.functions.toggleTag(tag),
            },
            () => (vm.functions.isTagSelected(tag) ? `✓ ${tag}` : tag),
          ),
        ),
      ]),
    ]),
    section({ class: layout.card() }, [
      Show(
        () => vm.state.isPending(),
        () => p({ class: layout.muted() }, () => i18n.t('users.loading')),
        () => [
          TableSectionHeader({
            title: () => i18n.t('users.tableTitle'),
            count: () => vm.state.userTotal(),
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
                List(() => vm.data.usersListItems(), (user) =>
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
                                disabled: () => vm.state.pendingAction(),
                                onClick: () => vm.functions.deleteUserById(user),
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
      ),
      p({ class: `${layout.muted()} mt-4` }, () =>
        i18n.t('users.pagination', {
          page: vm.state.userPage(),
          totalPages: vm.state.userTotalPages(),
          total: vm.state.userTotal(),
        }),
      ),
      div({ class: 'mt-3 flex flex-wrap gap-2' }, [
        button({ type: 'button', class: layout.btn(), onClick: vm.functions.prevPage }, '←'),
        button({ type: 'button', class: layout.btn(), onClick: vm.functions.nextPage }, '→'),
      ]),
    ]),
  ]),
  'UsersListView',
)
