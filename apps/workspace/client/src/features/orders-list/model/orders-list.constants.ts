export const ORDER_STATUSES = ['all', 'pending', 'paid', 'shipped', 'refunded'] as const
export const ORDER_FILTER_TAGS = ['priority', 'eu', 'us', 'trial'] as const

export type OrderStatusFilter = (typeof ORDER_STATUSES)[number]
