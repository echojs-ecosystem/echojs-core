import { signal } from '@echojs-ecosystem/reactivity'

import { createOrderMutation } from '@entities/api/index'

export const createOrderAction = createOrderMutation.create()
export const $orderCreateError = signal<string | null>(null)
