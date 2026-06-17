import { z } from 'zod'

export const orderEditFormSchema = z.object({
  customer: z.string().trim().min(1),
  total: z.number().min(0),
  status: z.enum(['pending', 'paid', 'shipped', 'refunded']),
  tags: z.array(z.string()),
})

export type OrderEditFormValue = z.infer<typeof orderEditFormSchema>
