import { createField, createForm } from '@echojs-ecosystem/form'

import {
  userFormDefaults,
  userFormSchema,
  type UserFormValue,
} from '@entities/user/model/user-form.schema'

type UserCreateFields = {
  name: ReturnType<typeof createField<string>>
  email: ReturnType<typeof createField<string>>
  role: ReturnType<typeof createField<UserFormValue['role']>>
  status: ReturnType<typeof createField<UserFormValue['status']>>
  department: ReturnType<typeof createField<UserFormValue['department']>>
  country: ReturnType<typeof createField<string>>
  verified: ReturnType<typeof createField<boolean>>
  tags: ReturnType<typeof createField<string[]>>
}

export const userCreateForm = createForm<UserFormValue, UserCreateFields>(
  {
    name: createField(''),
    email: createField(''),
    role: createField(userFormDefaults.role),
    status: createField(userFormDefaults.status),
    department: createField(userFormDefaults.department),
    country: createField(userFormDefaults.country),
    verified: createField(userFormDefaults.verified),
    tags: createField<string[]>([]),
  },
  {
    name: 'UserCreateForm',
    validationSchema: userFormSchema,
    defaultValues: userFormDefaults,
  },
)
