import type { AdminOrder } from '@echojs-ecosystem/workspace-shared'

export const newOrderPermissionSubject: AdminOrder = {
  id: '__new__',
  customer: 'New order',
  total: 0,
  status: 'pending',
  tags: [],
}
