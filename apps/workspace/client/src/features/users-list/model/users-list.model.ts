import { createModel } from '@echojs-ecosystem/framework/hyperdom'
import type { AdminUser } from '@echojs-ecosystem/workspace-shared'

import { i18n } from '@core/i18n/index'
import { appPermission } from '@core/permission/index.js'
import { deleteUserMutation, usersListQuery } from '@core/api/index'
import { USER_LIST_COUNTRIES, USER_LIST_FILTER_TAGS } from './users-list.constants'
import { usersQueryParams } from './users-filters'

export const usersListModel = createModel(
  () => {
    const usersList = usersListQuery.with(() => {
      const filters = usersQueryParams.value()
      return {
        q: filters.q,
        page: filters.page,
        pageSize: filters.pageSize,
        role: filters.role,
        status: filters.status,
        department: filters.department,
        verified: filters.verified,
        country: filters.country || undefined,
        tag: [...filters.tag],
        sort: filters.sort,
        order: filters.order,
      }
    })

    const deleteUser = deleteUserMutation.create()

    const usersListResponse = () => usersList.data()
    const userPage = () => usersListResponse()?.page ?? 1
    const userTotalPages = () => usersListResponse()?.totalPages ?? 1
    const userTotal = () => usersListResponse()?.total ?? 0

    const setQ = (value: string): void => {
      usersQueryParams.set({ q: value, page: 1 })
    }

    const setRole = (role: ReturnType<typeof usersQueryParams.value>['role']): void => {
      usersQueryParams.set({ role, page: 1 })
    }

    const setStatus = (status: ReturnType<typeof usersQueryParams.value>['status']): void => {
      usersQueryParams.set({ status, page: 1 })
    }

    const setDepartment = (
      department: ReturnType<typeof usersQueryParams.value>['department'],
    ): void => {
      usersQueryParams.set({ department, page: 1 })
    }

    const setVerified = (verified: ReturnType<typeof usersQueryParams.value>['verified']): void => {
      usersQueryParams.set({ verified, page: 1 })
    }

    const setCountry = (country: string): void => {
      usersQueryParams.set({ country, page: 1 })
    }

    const setSortOrder = (
      sort: ReturnType<typeof usersQueryParams.value>['sort'],
      order: ReturnType<typeof usersQueryParams.value>['order'],
    ): void => {
      usersQueryParams.set({ sort, order, page: 1 })
    }

    const setPageSize = (pageSize: number): void => {
      usersQueryParams.set({ pageSize, page: 1 })
    }

    const toggleTag = (tag: string): void => {
      const current = usersQueryParams.value().tag
      const next = current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]
      usersQueryParams.set({ tag: next, page: 1 })
    }

    const isTagSelected = (tag: string): boolean => usersQueryParams.value().tag.includes(tag)

    const resetFilters = (): void => {
      usersQueryParams.reset()
    }

    const prevPage = (): void => {
      usersQueryParams.set({ page: Math.max(1, userPage() - 1) })
    }

    const nextPage = (): void => {
      usersQueryParams.set({ page: Math.min(userTotalPages(), userPage() + 1) })
    }

    const deleteUserById = (user: AdminUser): void => {
      if (!appPermission.check('user.delete', user)) return
      if (!window.confirm(i18n.t('users.deleteConfirm', { name: user.name }))) return
      void deleteUser.run({ id: user.id })
    }

    return {
      state: {
        q: () => usersQueryParams.value().q,
        role: () => usersQueryParams.value().role,
        status: () => usersQueryParams.value().status,
        department: () => usersQueryParams.value().department,
        verified: () => usersQueryParams.value().verified,
        country: () => usersQueryParams.value().country,
        sort: () => usersQueryParams.value().sort,
        order: () => usersQueryParams.value().order,
        pageSize: () => usersQueryParams.value().pageSize,
        sortOrder: () =>
          `${usersQueryParams.value().sort}:${usersQueryParams.value().order}` as const,
        isPending: () => usersList.isPending(),
        statusText: () => usersList.status(),
        pendingAction: () => deleteUser.isPending(),
        userPage,
        userTotalPages,
        userTotal,
      },
      data: {
        userTags: USER_LIST_FILTER_TAGS,
        userCountries: USER_LIST_COUNTRIES,
        usersListResponse,
        usersListItems: () => usersListResponse()?.items ?? [],
      },
      functions: {
        setQ,
        setRole,
        setStatus,
        setDepartment,
        setVerified,
        setCountry,
        setSortOrder,
        setPageSize,
        toggleTag,
        isTagSelected,
        resetFilters,
        prevPage,
        nextPage,
        deleteUserById,
      },
    }
  },
  { name: 'UsersListModel', structExports: true },
)

export type UsersListVM = ReturnType<typeof usersListModel>
