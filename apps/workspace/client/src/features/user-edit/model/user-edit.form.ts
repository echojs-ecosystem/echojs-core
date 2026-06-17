import { createField, createForm } from '@echojs-ecosystem/form'

import { userEditFormDefaults } from './user-edit.constants'
import { userEditFormSchema, type UserEditFormValue } from './user-edit.validation'

type UserEditFields = {
  name: ReturnType<typeof createField<string>>
  email: ReturnType<typeof createField<string>>
  role: ReturnType<typeof createField<UserEditFormValue['role']>>
  status: ReturnType<typeof createField<UserEditFormValue['status']>>
  department: ReturnType<typeof createField<UserEditFormValue['department']>>
  country: ReturnType<typeof createField<string>>
  verified: ReturnType<typeof createField<boolean>>
  tags: ReturnType<typeof createField<string[]>>
}

export const userEditForm = createForm<UserEditFormValue, UserEditFields>(
  {
    name: createField(''),
    email: createField(''),
    role: createField(userEditFormDefaults.role),
    status: createField(userEditFormDefaults.status),
    department: createField(userEditFormDefaults.department),
    country: createField(userEditFormDefaults.country),
    verified: createField(userEditFormDefaults.verified),
    tags: createField<string[]>([]),
  },
  {
    name: 'UserEditForm',
    validationSchema: userEditFormSchema,
    defaultValues: userEditFormDefaults,
  },
)
