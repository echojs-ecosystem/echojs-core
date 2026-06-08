import type {
  AdminOrder,
  AdminUser,
  AdminUserDepartment,
  AdminUserRole,
  AdminUserStatus,
} from '@echojs-ecosystem/workspace-shared'

const DEPARTMENTS: AdminUserDepartment[] = ['engineering', 'sales', 'support', 'marketing', 'ops']
const ROLES: AdminUserRole[] = ['admin', 'manager', 'editor', 'viewer']
const STATUSES: AdminUserStatus[] = ['active', 'invited', 'suspended']
const COUNTRIES = ['US', 'DE', 'FR', 'GB', 'JP', 'BR', 'IN', 'RU', 'CA', 'AU'] as const
const TAGS = ['remote', 'on-site', 'contract', 'full-time', 'beta', 'vip', 'mentor', 'new-hire'] as const

const FIRST = [
  'Alice',
  'Bob',
  'Carl',
  'Dana',
  'Elena',
  'Felix',
  'Grace',
  'Hugo',
  'Iris',
  'Jack',
  'Kate',
  'Leo',
  'Mia',
  'Noah',
  'Olga',
  'Paul',
  'Quinn',
  'Rita',
  'Sam',
  'Tina',
  'Uma',
  'Victor',
  'Wendy',
  'Xander',
  'Yuki',
  'Zara',
  'Adam',
  'Bella',
  'Chris',
  'Diana',
  'Ethan',
  'Fiona',
  'George',
  'Hannah',
  'Ivan',
  'Julia',
  'Kevin',
  'Luna',
  'Marco',
  'Nina',
  'Oscar',
  'Petra',
  'Ravi',
  'Sofia',
  'Tom',
  'Ursula',
  'Vera',
  'Will',
] as const

const LAST = [
  'Nguyen',
  'Smith',
  'Garcia',
  'Müller',
  'Kim',
  'Brown',
  'Lee',
  'Patel',
  'Wilson',
  'Kowalski',
  'Chen',
  'Rossi',
  'Dubois',
  'Sato',
  'Silva',
] as const

const isoDaysAgo = (days: number): string => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

const pick = <T>(items: readonly T[], index: number): T => items[index % items.length]!

export const seedUsers: AdminUser[] = FIRST.map((first, index) => {
  const last = pick(LAST, index)
  const role = pick(ROLES, index + 2)
  const status = index % 11 === 0 ? 'suspended' : index % 7 === 0 ? 'invited' : 'active'
  const department = pick(DEPARTMENTS, index)
  const country = pick(COUNTRIES, index + 3)
  const slug = `${first}.${last}`.toLowerCase().replace(/[^a-z.]/g, '')

  return {
    id: `u-${String(index + 1).padStart(3, '0')}`,
    name: `${first} ${last}`,
    role,
    email: `${slug}@echo.dev`,
    status,
    department,
    country,
    verified: status === 'active' && index % 5 !== 0,
    tags: [
      pick(TAGS, index),
      ...(index % 3 === 0 ? [pick(TAGS, index + 4)] : []),
    ],
    lastActiveAt: isoDaysAgo(index % 30),
    createdAt: isoDaysAgo(90 + index),
  }
})

export const seedOrders: AdminOrder[] = [
  { id: 'o-1001', customer: 'Northwind LLC', total: 1299, status: 'paid', tags: ['priority', 'eu'] },
  { id: 'o-1002', customer: 'Acme Corp', total: 420, status: 'pending', tags: ['trial'] },
  { id: 'o-1003', customer: 'Globex', total: 89, status: 'shipped', tags: ['eu'] },
  { id: 'o-1004', customer: 'Initech', total: 2400, status: 'paid', tags: ['priority', 'us'] },
  { id: 'o-1005', customer: 'Umbrella', total: 15, status: 'refunded', tags: [] },
  { id: 'o-1006', customer: 'Stark Industries', total: 9999, status: 'paid', tags: ['priority', 'us'] },
]
