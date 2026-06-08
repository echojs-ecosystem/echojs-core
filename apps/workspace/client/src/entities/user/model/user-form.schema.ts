import { z } from 'zod'

export const userFormSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  role: z.enum(['admin', 'manager', 'editor', 'viewer']),
  status: z.enum(['active', 'invited', 'suspended']),
  department: z.enum(['engineering', 'sales', 'support', 'marketing', 'ops']),
  country: z.string().length(2),
  verified: z.boolean(),
  tags: z.array(z.string()),
})

export type UserFormValue = z.infer<typeof userFormSchema>

export const userFormDefaults: UserFormValue = {
  name: '',
  email: '',
  role: 'viewer',
  status: 'invited',
  department: 'engineering',
  country: 'US',
  verified: false,
  tags: [],
}
