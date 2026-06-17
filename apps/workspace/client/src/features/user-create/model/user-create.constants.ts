import type { UserCreateFormValue } from './user-create.validation'

export const userCreateFormDefaults: UserCreateFormValue = {
  name: '',
  email: '',
  role: 'viewer',
  status: 'invited',
  department: 'engineering',
  country: 'US',
  verified: false,
  tags: [],
}

export const USER_CREATE_TAGS = [
  'remote',
  'on-site',
  'contract',
  'full-time',
  'beta',
  'vip',
  'mentor',
  'new-hire',
] as const

export const USER_CREATE_COUNTRIES = ['US', 'DE', 'FR', 'GB', 'JP', 'BR', 'IN', 'RU', 'CA', 'AU'] as const
