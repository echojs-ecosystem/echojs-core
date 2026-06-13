import { signal } from '@echojs-ecosystem/reactivity'

import { orderDetailQuery } from '@core/api/index'

export const $routeOrderId = signal('')

export const syncRouteOrderId = (id: string): void => {
  if ($routeOrderId.peek() !== id) {
    $routeOrderId.set(id)
  }
}

export const routeOrderDetail = orderDetailQuery.with(
  () => ({ id: $routeOrderId.value() }),
  { enabled: () => Boolean($routeOrderId.value()) },
)
