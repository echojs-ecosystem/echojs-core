import type { UserEditFormValue } from './user-edit.validation'

export const userEditFormDefaults: UserEditFormValue = {
  name: '',
  email: '',
  role: 'viewer',
  status: 'invited',
  department: 'engineering',
  country: 'US',
  verified: false,
  tags: [],
}

export const USER_EDIT_TAGS = [
  'remote',
  'on-site',
  'contract',
  'full-time',
  'beta',
  'vip',
  'mentor',
  'new-hire',
] as const

export const USER_EDIT_COUNTRIES = ['US', 'DE', 'FR', 'GB', 'JP', 'BR', 'IN', 'RU', 'CA', 'AU'] as const
