import {
  deleteOrderMutation,
  ordersListQuery,
  refundOrderMutation,
} from '@entities/api/index'

import { ordersQueryParams } from './orders-filters'

export const ordersList = ordersListQuery.with(() => {
  const filters = ordersQueryParams.value()
  return {
    q: filters.q,
    page: filters.page,
    status: filters.status,
    priority: filters.priority,
    tag: [...filters.tag],
  }
})

export const refundOrder = refundOrderMutation.create()
export const deleteOrder = deleteOrderMutation.create()
