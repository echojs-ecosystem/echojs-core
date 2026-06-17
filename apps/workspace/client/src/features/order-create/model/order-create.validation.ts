import { z } from 'zod'

export const orderCreateFormSchema = z.object({
  customer: z.string().trim().min(1),
  total: z.number().min(0),
  status: z.enum(['pending', 'paid', 'shipped', 'refunded']),
  tags: z.array(z.string()),
})

export type OrderCreateFormValue = z.infer<typeof orderCreateFormSchema>
