import { signal } from '@echojs-ecosystem/reactivity'

import { userDetailQuery } from '@core/api/index'

export const $routeUserId = signal('')

export const syncRouteUserId = (id: string): void => {
  if ($routeUserId.peek() !== id) {
    $routeUserId.set(id)
  }
}

export const routeUserDetail = userDetailQuery.with(
  () => ({ id: $routeUserId.value() }),
  { enabled: () => Boolean($routeUserId.value()) },
)
