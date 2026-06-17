import {
  createQueryParams,
  parseAsArrayOf,
  parseAsInteger,
  parseAsLiteral,
  parseAsString,
} from '@echojs-ecosystem/url-state'

export const usersQueryParams = createQueryParams(
  {
    q: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(12),
    role: parseAsLiteral(['all', 'admin', 'manager', 'editor', 'viewer'] as const).withDefault('all'),
    status: parseAsLiteral(['all', 'active', 'invited', 'suspended'] as const).withDefault('all'),
    department: parseAsLiteral([
      'all',
      'engineering',
      'sales',
      'support',
      'marketing',
      'ops',
    ] as const).withDefault('all'),
    verified: parseAsLiteral(['all', 'true', 'false'] as const).withDefault('all'),
    country: parseAsString.withDefault(''),
    tag: parseAsArrayOf(parseAsString).withDefault([]),
    sort: parseAsLiteral(['name', 'email', 'createdAt', 'lastActiveAt'] as const).withDefault('name'),
    order: parseAsLiteral(['asc', 'desc'] as const).withDefault('asc'),
  },
  {
    defaultVisibility: 'show',
    shallow: true,
    history: 'replace',
    urlKeys: { pageSize: 'size' },
  },
)

