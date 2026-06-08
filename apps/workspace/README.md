# EchoJS Workspace — full-stack admin demo

Showcase admin panel: **client** (EchoJS + HyperDOM + signals) + **server** (Elysia API).

## Structure

```
apps/workspace/
  client/   Vite SPA — router, query, permission, url-state
  server/   Bun + Elysia — REST API, in-memory store
  shared/   DTO types shared between client and server
```

## Quick start

```bash
# from repo root
bun install

# both client (3002) and server (3003)
cd apps/workspace && bun run dev
```

Or separately:

```bash
bun run dev:server   # http://localhost:3003
bun run dev:client   # http://localhost:3002 → proxies /api to server
```

Open **http://localhost:3002/admin**

## What this demonstrates

| Layer | EchoJS packages | Demo |
|-------|-----------------|------|
| UI | `hyperdom`, `framework` | Nested admin layouts, signal-native views |
| Data | `@echojs-ecosystem/query` | `createQuery` / `createMutation` → Elysia |
| URL | `@echojs-ecosystem/url-state` | Orders filters synced to search params |
| AuthZ | `@echojs-ecosystem/permission` | Role templates + payload rules + hydrate from API |
| State | `@echojs-ecosystem/store`, `persist` | Session in localStorage |
| Router | `@echojs-ecosystem/router` | Nested routes, guards, redirects |

## API (server)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Liveness + uptime |
| GET | `/api/bootstrap?role=` | Stats + permission snapshot (SSR-style transfer) |
| GET | `/api/dashboard/stats` | Dashboard counters |
| GET | `/api/users` | Users list |
| GET | `/api/users/:id` | User detail |
| GET | `/api/orders` | Filtered paginated orders |
| POST | `/api/orders/:id/refund` | Refund mutation |
| POST | `/api/demo/reset` | Reset in-memory DB |

## Nested routes

- `/admin/users/:id?tab=profile`
- `/admin/catalog/electronics/product/phone/variant/128gb?tab=specs`
- `/admin/org/acme/team/platform/sprint/s24?tab=board`
- `/admin/orders?q=&status=all&prio=false`
