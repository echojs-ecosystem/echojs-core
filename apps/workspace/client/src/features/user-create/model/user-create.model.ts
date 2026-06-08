import { signal } from '@echojs-ecosystem/reactivity'

import { createUserMutation } from '@entities/api/index'

export const createUserAction = createUserMutation.create()
export const $userCreateError = signal<string | null>(null)
