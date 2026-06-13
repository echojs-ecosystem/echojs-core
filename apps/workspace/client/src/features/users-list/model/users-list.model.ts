import { deleteUserMutation, usersListQuery } from '@core/api/index'

import { usersQueryParams } from './users-filters'

/** Query/mutation instances must live outside the view — `.with()` on every render spawns new observers. */
export const usersList = usersListQuery.with(() => {
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

export const deleteUser = deleteUserMutation.create()
