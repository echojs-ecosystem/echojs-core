import { z } from 'zod'

export const userEditFormSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  role: z.enum(['admin', 'manager', 'editor', 'viewer']),
  status: z.enum(['active', 'invited', 'suspended']),
  department: z.enum(['engineering', 'sales', 'support', 'marketing', 'ops']),
  country: z.string().length(2),
  verified: z.boolean(),
  tags: z.array(z.string()),
})

export type UserEditFormValue = z.infer<typeof userEditFormSchema>
