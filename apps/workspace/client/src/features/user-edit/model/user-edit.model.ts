import { signal } from '@echojs-ecosystem/reactivity'
import type { AdminUser } from '@echojs-ecosystem/workspace-shared'

import { updateUserMutation } from '@core/api/index'

import { userToFormValue } from './helpers/user-to-form-value'
import { userEditForm } from './user-edit.form'

export const updateUserAction = updateUserMutation.create()
export const $userEditError = signal<string | null>(null)

let hydratedUserId: string | null = null

export const hydrateUserEditForm = (user: AdminUser): void => {
  if (hydratedUserId === user.id) return
  hydratedUserId = user.id
  userEditForm.hydrate(userToFormValue(user))
}
