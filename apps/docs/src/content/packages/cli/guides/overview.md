---
title: Overview
description: EchoJS CLI goals and current status.
package: "@echojs-ecosystem/cli"
---

# Overview

`@echojs-ecosystem/cli` will scaffold EchoJS apps and generate feature slices aligned with the ecosystem's feature-first layout.

> [!warning]
> **CLI is on the roadmap.** Commands are not implemented. Use `apps/example` as the reference layout until `echojs create` ships.

## Goals

| Capability | Status |
| --- | --- |
| `echojs create my-app` | **planned** — new app from template |
| `echojs generate feature name` | **planned** — feature slice scaffold |
| `echojs doctor` | **planned** — validate FSD / architect layout |
| `echojs.config.ts` | **planned** — project config |

## Why a CLI

- Consistent folder structure across apps
- Faster onboarding than copying `apps/example` manually
- CI-friendly `doctor --json` for layout validation (pairs with [Architect](/docs/packages/architect))

## Interim workflow

1. Copy or study `apps/example`
2. Run [Architect](/docs/packages/architect) lint via `echo-architect lint`
3. Follow [Project Structure](/docs/getting-started/project-structure)

## See also

- [Planned Commands](/docs/packages/cli/guides/planned-commands)
- [Installation](/docs/packages/cli/installation)
