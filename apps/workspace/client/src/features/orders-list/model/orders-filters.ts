import {
  createQueryParams,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsLiteral,
  parseAsString,
} from '@echojs-ecosystem/url-state'

export const ordersQueryParams = createQueryParams(
  {
    q: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    status: parseAsLiteral(['all', 'pending', 'paid', 'shipped', 'refunded'] as const).withDefault('all'),
    priority: parseAsBoolean.withDefault(false),
    tag: parseAsArrayOf(parseAsString).withDefault([]),
  },
  {
    defaultVisibility: 'show',
    shallow: true,
    history: 'replace',
    urlKeys: { priority: 'prio' },
  },
)
