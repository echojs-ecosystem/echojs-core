# @echojs-ecosystem/workspace

EchoJS admin panel demo — nested routes, URL filters, `@echojs-ecosystem/permission`, docs-style amber UI.

## Scripts

```bash
bun run dev          # http://localhost:3002
bun run build
bun run typecheck
bun run lint
bun run architect
```

## Features demonstrated

- **FSD layout** — `app/`, `pages/`, `widgets/`, `features/`, `entities/`, `core/`
- **Nested routes** — users, catalog (3 levels), org → team → sprint
- **URL state** — orders page filters via `@echojs-ecosystem/url-state`
- **Permissions** — role templates (admin/manager/viewer), route guard on settings
- **Architect** — `architect.config.ts` layer rules

## Default nested URLs

- `/admin/users/:id?tab=profile`
- `/admin/catalog/electronics/product/phone/variant/128gb?tab=specs`
- `/admin/org/acme/team/platform/sprint/s24?tab=board`
- `/admin/orders?q=&status=all&prio=false`
