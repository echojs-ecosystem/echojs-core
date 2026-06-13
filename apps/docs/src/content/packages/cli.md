---
title: CLI
description: Scaffold EchoJS apps and feature slices (planned).
package: '@echojs-ecosystem/cli'
keywords: [cli, scaffold, generate]
---

:::package-overview cli

:::install @echojs-ecosystem/cli

## Planned workflow

The CLI will scaffold apps and slices that match the FSD layout used in
`apps/example` and `apps/docs`:

```bash
# Planned
npx @echojs-ecosystem/cli create my-app
cd my-app && bun dev

# Generate a feature slice
npx @echojs-ecosystem/cli generate feature orders-list
```

Until `create-echo` ships, copy `apps/example` and trim packages you do not need.

## What to expect

| Command | Purpose |
| ------- | ------- |
| `create` | New app with bootstrap, router, and provider stubs |
| `generate` | Feature / entity / page slice with `model` + `ui` folders |

> [!note] CLI is on the roadmap. Use [First Application](/docs/getting-started/first-application)
> and [Project Structure](/docs/getting-started/project-structure) as the reference today.

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/cli/functions) | Planned commands (`create`, `generate`) |
| [Guides](/docs/packages/cli/guides/overview) | Roadmap |
