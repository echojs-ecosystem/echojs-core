import { describe, expect, it } from 'vitest'
import type { AdminUser } from '@echojs-ecosystem/workspace-shared'

import { userToFormValue } from './user-to-form-value'

const sampleUser: AdminUser = {
  id: 'usr_1',
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'manager',
  status: 'active',
  department: 'engineering',
  country: 'US',
  verified: true,
  tags: ['remote', 'vip'],
  createdAt: '2024-01-01T00:00:00.000Z',
  lastActiveAt: '2024-06-01T00:00:00.000Z',
}

describe('userToFormValue', () => {
  it('maps user fields to form value', () => {
    expect(userToFormValue(sampleUser)).toEqual({
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'manager',
      status: 'active',
      department: 'engineering',
      country: 'US',
      verified: true,
      tags: ['remote', 'vip'],
    })
  })

  it('copies tags array', () => {
    const formValue = userToFormValue(sampleUser)

    expect(formValue.tags).not.toBe(sampleUser.tags)
    expect(formValue.tags).toEqual(sampleUser.tags)
  })
})
