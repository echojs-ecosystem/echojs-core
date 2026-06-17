import type { AdminUser } from '@echojs-ecosystem/workspace-shared'

import type { UserEditFormValue } from '../user-edit.validation'

export const userToFormValue = (user: AdminUser): UserEditFormValue => ({
  name: user.name,
  email: user.email,
  role: user.role,
  status: user.status,
  department: user.department,
  country: user.country,
  verified: user.verified,
  tags: [...user.tags],
})
