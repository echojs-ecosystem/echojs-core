# EchoJS Workspace — full-stack admin demo

Showcase admin panel: **client** (EchoJS + HyperDOM + signals) + **server** (Go + Gin API).

## Structure

```
apps/workspace/
  client/   Vite SPA — router, query, permission, url-state
  server/   Go + Gin — REST API, PostgreSQL (or in-memory fallback)
  shared/   DTO types shared with the client (TypeScript)
```

## Prerequisites

- [Bun](https://bun.sh) — client dev server
- [Go](https://go.dev) 1.22+ — API server
- [Docker](https://www.docker.com) — optional, for PostgreSQL + API

## Quick start (Docker)

```bash
cd apps/workspace
bun run docker:up
```

API: **http://localhost:3003** — PostgreSQL on port **5432**.

Stop: `bun run docker:down` · wipe DB volume: `bun run docker:reset`

## Quick start (local)

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
| Data | `@echojs-ecosystem/async` | `createQuery` / `createMutation` → Gin API |
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
| POST | `/api/demo/reset` | Reset demo data (re-seed) |

Without `DATABASE_URL` the server uses an in-memory store. With PostgreSQL, data persists across restarts.

## Nested routes

- `/admin/users/:id?tab=profile`
- `/admin/catalog/electronics/product/phone/variant/128gb?tab=specs`
- `/admin/org/acme/team/platform/sprint/s24?tab=board`
- `/admin/orders?q=&status=all&prio=false`
