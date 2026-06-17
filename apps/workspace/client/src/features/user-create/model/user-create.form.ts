import { createField, createForm } from '@echojs-ecosystem/form'

import { userCreateFormDefaults } from './user-create.constants'
import { userCreateFormSchema, type UserCreateFormValue } from './user-create.validation'

type UserCreateFields = {
  name: ReturnType<typeof createField<string>>
  email: ReturnType<typeof createField<string>>
  role: ReturnType<typeof createField<UserCreateFormValue['role']>>
  status: ReturnType<typeof createField<UserCreateFormValue['status']>>
  department: ReturnType<typeof createField<UserCreateFormValue['department']>>
  country: ReturnType<typeof createField<string>>
  verified: ReturnType<typeof createField<boolean>>
  tags: ReturnType<typeof createField<string[]>>
}

export const userCreateForm = createForm<UserCreateFormValue, UserCreateFields>(
  {
    name: createField(''),
    email: createField(''),
    role: createField(userCreateFormDefaults.role),
    status: createField(userCreateFormDefaults.status),
    department: createField(userCreateFormDefaults.department),
    country: createField(userCreateFormDefaults.country),
    verified: createField(userCreateFormDefaults.verified),
    tags: createField<string[]>([]),
  },
  {
    name: 'UserCreateForm',
    validationSchema: userCreateFormSchema,
    defaultValues: userCreateFormDefaults,
  },
)
