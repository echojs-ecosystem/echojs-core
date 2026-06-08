import { signal } from '@echojs-ecosystem/reactivity'
import type { AdminUser } from '@echojs-ecosystem/workspace-shared'

import { updateUserMutation } from '@entities/api/index'
import { userEditForm } from './user-edit.form'

export const updateUserAction = updateUserMutation.create()
export const $userEditError = signal<string | null>(null)

let hydratedUserId: string | null = null

export const hydrateUserEditForm = (user: AdminUser): void => {
  if (hydratedUserId === user.id) return
  hydratedUserId = user.id
  userEditForm.hydrate({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    department: user.department,
    country: user.country,
    verified: user.verified,
    tags: [...user.tags],
  })
}
