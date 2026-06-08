import { z } from 'zod'

export const orderFormSchema = z.object({
  customer: z.string().trim().min(1),
  total: z.number().min(0),
  status: z.enum(['pending', 'paid', 'shipped', 'refunded']),
  tags: z.array(z.string()),
})

export type OrderFormValue = z.infer<typeof orderFormSchema>

export const orderFormDefaults: OrderFormValue = {
  customer: '',
  total: 0,
  status: 'pending',
  tags: [],
}
