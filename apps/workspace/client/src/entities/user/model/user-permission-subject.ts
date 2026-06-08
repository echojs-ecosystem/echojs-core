import type { AdminUser } from '@echojs-ecosystem/workspace-shared'

/** Synthetic subject for `user.update` checks when no row exists yet (create flow). */
export const newUserPermissionSubject: AdminUser = {
  id: '__new__',
  name: 'New user',
  role: 'viewer',
  email: 'new@echo.dev',
  status: 'invited',
  department: 'engineering',
  country: 'US',
  verified: false,
  tags: [],
  lastActiveAt: new Date(0).toISOString(),
  createdAt: new Date(0).toISOString(),
}
