import type {
  AdminUser,
  CreateUserInput,
  UpdateUserInput,
  UsersListQuery,
  UsersListResponse,
} from '@echojs-ecosystem/workspace-shared'

import { db } from '../data/store'

const DEFAULT_PAGE_SIZE = 12

const compare = (left: string, right: string): number => left.localeCompare(right, undefined, { sensitivity: 'base' })

export const filterUsers = (users: AdminUser[], query: UsersListQuery): AdminUser[] => {
  const q = query.q?.trim().toLowerCase() ?? ''
  const role = query.role ?? 'all'
  const status = query.status ?? 'all'
  const department = query.department ?? 'all'
  const verified = query.verified ?? 'all'
  const country = query.country?.trim().toUpperCase() ?? ''
  const tags = query.tag ?? []
  const sort = query.sort ?? 'name'
  const order = query.order ?? 'asc'

  const filtered = users.filter((user) => {
    if (role !== 'all' && user.role !== role) return false
    if (status !== 'all' && user.status !== status) return false
    if (department !== 'all' && user.department !== department) return false
    if (verified === 'true' && !user.verified) return false
    if (verified === 'false' && user.verified) return false
    if (country && user.country.toUpperCase() !== country) return false
    if (tags.length > 0 && !tags.some((tag) => user.tags.includes(tag))) return false
    if (!q) return true
    return (
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.id.toLowerCase().includes(q) ||
      user.department.toLowerCase().includes(q)
    )
  })

  const sorted = [...filtered].sort((a, b) => {
    const pickValue = (user: AdminUser): string => {
      if (sort === 'email') return user.email
      if (sort === 'createdAt') return user.createdAt
      if (sort === 'lastActiveAt') return user.lastActiveAt
      return user.name
    }
    const result = compare(pickValue(a), pickValue(b))
    return order === 'desc' ? -result : result
  })

  return sorted
}

export const listUsers = (query: UsersListQuery): UsersListResponse => {
  const pageSize = Math.min(Math.max(query.pageSize ?? DEFAULT_PAGE_SIZE, 5), 50)
  const filtered = filterUsers(db.users, query)
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const page = Math.min(Math.max(1, query.page ?? 1), totalPages)
  const start = (page - 1) * pageSize

  return {
    items: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
    totalPages,
  }
}

export const createUser = (input: CreateUserInput): AdminUser => {
  const user: AdminUser = {
    id: `u-${Date.now()}`,
    ...input,
    tags: [...input.tags],
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  }
  db.users.unshift(user)
  return user
}

export const updateUser = (id: string, input: UpdateUserInput): AdminUser | null => {
  const user = db.users.find((item) => item.id === id)
  if (!user) return null

  if (input.name !== undefined) user.name = input.name
  if (input.email !== undefined) user.email = input.email
  if (input.role !== undefined) user.role = input.role
  if (input.status !== undefined) user.status = input.status
  if (input.department !== undefined) user.department = input.department
  if (input.country !== undefined) user.country = input.country.toUpperCase()
  if (input.verified !== undefined) user.verified = input.verified
  if (input.tags !== undefined) user.tags = [...input.tags]
  user.lastActiveAt = new Date().toISOString()

  return user
}

export const deleteUser = (id: string): boolean => {
  const index = db.users.findIndex((item) => item.id === id)
  if (index < 0) return false
  db.users.splice(index, 1)
  return true
}

export const suspendUser = (id: string): AdminUser | null => updateUser(id, { status: 'suspended' })

export const activateUser = (id: string): AdminUser | null =>
  updateUser(id, { status: 'active', verified: true })
