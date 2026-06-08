import { cors } from '@elysiajs/cors'
import { Elysia, t } from 'elysia'
import type {
  AdminUserDepartment,
  AdminUserRole,
  AdminUserStatus,
  ApiHealth,
  BootstrapPayload,
  CreateOrderInput,
  CreateUserInput,
  OrdersListResponse,
  UpdateOrderInput,
  UpdateUserInput,
  UsersListResponse,
  WorkspaceRole,
} from '@echojs-ecosystem/workspace-shared'

import { db, findOrder, findUser, resetStore } from './data/store'
import { buildBootstrap } from './lib/bootstrap'
import {
  createOrder,
  deleteOrder,
  listOrders,
  refundOrder,
  updateOrder,
} from './lib/orders'
import {
  activateUser,
  createUser,
  deleteUser,
  listUsers,
  suspendUser,
  updateUser,
} from './lib/users'

const startedAt = Date.now()

const parseTags = (value: string | undefined): string[] => {
  if (!value?.trim()) return []
  return value.split(',').map((tag) => tag.trim()).filter(Boolean)
}

const userBody = t.Object({
  name: t.String({ minLength: 1 }),
  email: t.String({ format: 'email' }),
  role: t.Union([
    t.Literal('admin'),
    t.Literal('manager'),
    t.Literal('editor'),
    t.Literal('viewer'),
  ]),
  status: t.Union([t.Literal('active'), t.Literal('invited'), t.Literal('suspended')]),
  department: t.Union([
    t.Literal('engineering'),
    t.Literal('sales'),
    t.Literal('support'),
    t.Literal('marketing'),
    t.Literal('ops'),
  ]),
  country: t.String({ minLength: 2, maxLength: 2 }),
  verified: t.Boolean(),
  tags: t.Array(t.String()),
})

export const app = new Elysia()
  .use(
    cors({
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
  )
  .get('/api/health', (): ApiHealth => ({
    ok: true,
    service: 'workspace-server',
    version: '0.6.0',
    uptimeMs: Date.now() - startedAt,
  }))
  .get(
    '/api/bootstrap',
    ({ query }): BootstrapPayload => {
      const role = (query.role ?? 'manager') as WorkspaceRole
      return buildBootstrap(role)
    },
    {
      query: t.Object({
        role: t.Optional(t.Union([t.Literal('admin'), t.Literal('manager'), t.Literal('viewer')])),
      }),
    },
  )
  .get('/api/dashboard/stats', () => buildBootstrap('manager').stats)
  .get(
    '/api/users',
    ({ query }): UsersListResponse =>
      listUsers({
        q: query.q,
        page: query.page ? Number(query.page) : 1,
        pageSize: query.pageSize ? Number(query.pageSize) : undefined,
        role: (query.role as AdminUserRole | 'all') ?? 'all',
        status: (query.status as AdminUserStatus | 'all') ?? 'all',
        department: (query.department as AdminUserDepartment | 'all') ?? 'all',
        verified: (query.verified as 'all' | 'true' | 'false') ?? 'all',
        country: query.country,
        tag: parseTags(query.tag),
        sort: (query.sort as 'name' | 'email' | 'createdAt' | 'lastActiveAt') ?? 'name',
        order: (query.order as 'asc' | 'desc') ?? 'asc',
      }),
    {
      query: t.Object({
        q: t.Optional(t.String()),
        page: t.Optional(t.String()),
        pageSize: t.Optional(t.String()),
        role: t.Optional(t.String()),
        status: t.Optional(t.String()),
        department: t.Optional(t.String()),
        verified: t.Optional(t.String()),
        country: t.Optional(t.String()),
        tag: t.Optional(t.String()),
        sort: t.Optional(t.String()),
        order: t.Optional(t.String()),
      }),
    },
  )
  .get(
    '/api/users/:id',
    ({ params: { id }, set }) => {
      const user = findUser(id)
      if (!user) {
        set.status = 404
        return { error: 'User not found' }
      }
      return user
    },
    { params: t.Object({ id: t.String() }) },
  )
  .post(
    '/api/users',
    async ({ body, set }) => {
      await Bun.sleep(300)
      const existing = db.users.find((user) => user.email.toLowerCase() === body.email.toLowerCase())
      if (existing) {
        set.status = 409
        return { error: 'Email already exists' }
      }
      const user = createUser({
        ...body,
        country: body.country.toUpperCase(),
      } satisfies CreateUserInput)
      return { user }
    },
    { body: userBody },
  )
  .put(
    '/api/users/:id',
    async ({ params: { id }, body, set }) => {
      await Bun.sleep(300)
      const user = updateUser(id, {
        ...body,
        country: body.country?.toUpperCase(),
      } satisfies UpdateUserInput)
      if (!user) {
        set.status = 404
        return { error: 'User not found' }
      }
      return { user }
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Partial(userBody),
    },
  )
  .delete(
    '/api/users/:id',
    async ({ params: { id }, set }) => {
      await Bun.sleep(250)
      const ok = deleteUser(id)
      if (!ok) {
        set.status = 404
        return { error: 'User not found' }
      }
      return { ok: true as const }
    },
    { params: t.Object({ id: t.String() }) },
  )
  .post(
    '/api/users/:id/suspend',
    async ({ params: { id }, set }) => {
      await Bun.sleep(200)
      const user = suspendUser(id)
      if (!user) {
        set.status = 404
        return { error: 'User not found' }
      }
      return { user }
    },
    { params: t.Object({ id: t.String() }) },
  )
  .post(
    '/api/users/:id/activate',
    async ({ params: { id }, set }) => {
      await Bun.sleep(200)
      const user = activateUser(id)
      if (!user) {
        set.status = 404
        return { error: 'User not found' }
      }
      return { user }
    },
    { params: t.Object({ id: t.String() }) },
  )
  .get(
    '/api/orders/:id',
    ({ params: { id }, set }) => {
      const order = findOrder(id)
      if (!order) {
        set.status = 404
        return { error: 'Order not found' }
      }
      return order
    },
    { params: t.Object({ id: t.String() }) },
  )
  .get(
    '/api/orders',
    ({ query }): OrdersListResponse => {
      return listOrders({
        q: query.q,
        page: query.page ? Number(query.page) : 1,
        status: (query.status as OrdersListResponse['items'][number]['status'] | 'all') ?? 'all',
        priority: query.priority === 'true',
        tag: parseTags(query.tag),
      })
    },
    {
      query: t.Object({
        q: t.Optional(t.String()),
        page: t.Optional(t.String()),
        status: t.Optional(t.String()),
        priority: t.Optional(t.String()),
        tag: t.Optional(t.String()),
      }),
    },
  )
  .post(
    '/api/orders',
    async ({ body, set }) => {
      await Bun.sleep(300)
      if (body.total <= 0) {
        set.status = 400
        return { error: 'Total must be positive' }
      }
      const order = createOrder(body satisfies CreateOrderInput)
      return { order }
    },
    {
      body: t.Object({
        customer: t.String({ minLength: 1 }),
        total: t.Number({ minimum: 0 }),
        status: t.Union([
          t.Literal('pending'),
          t.Literal('paid'),
          t.Literal('shipped'),
          t.Literal('refunded'),
        ]),
        tags: t.Array(t.String()),
      }),
    },
  )
  .put(
    '/api/orders/:id',
    async ({ params: { id }, body, set }) => {
      await Bun.sleep(300)
      const order = updateOrder(id, body satisfies UpdateOrderInput)
      if (!order) {
        set.status = 404
        return { error: 'Order not found' }
      }
      return { order }
    },
    {
      params: t.Object({ id: t.String() }),
      body: t.Partial(
        t.Object({
          customer: t.String({ minLength: 1 }),
          total: t.Number({ minimum: 0 }),
          status: t.Union([
            t.Literal('pending'),
            t.Literal('paid'),
            t.Literal('shipped'),
            t.Literal('refunded'),
          ]),
          tags: t.Array(t.String()),
        }),
      ),
    },
  )
  .delete(
    '/api/orders/:id',
    async ({ params: { id }, set }) => {
      await Bun.sleep(250)
      const ok = deleteOrder(id)
      if (!ok) {
        set.status = 404
        return { error: 'Order not found' }
      }
      return { ok: true as const }
    },
    { params: t.Object({ id: t.String() }) },
  )
  .post(
    '/api/orders/:id/refund',
    async ({ params: { id }, set }) => {
      await Bun.sleep(400)
      const order = refundOrder(id)
      if (!order) {
        set.status = 400
        return { error: 'Refund not allowed' }
      }
      return { order }
    },
    { params: t.Object({ id: t.String() }) },
  )
  .post('/api/demo/reset', () => {
    resetStore()
    return { ok: true as const }
  })
