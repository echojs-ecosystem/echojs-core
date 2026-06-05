---
title: Callouts & admonitions
description: Note, tip, recommendation, warning, danger, and important blocks in EchoJS docs markdown.
---

# Callouts & admonitions

Use callouts to highlight recommendations, risks, and notes. They render as styled panels with icons.

## Syntax (GitHub-style)

```markdown
> [!NOTE] Optional custom title
> Body text supports multiple lines.

> [!RECOMMENDATION]
> Prefer feature-local models over a global store.

> [!WARNING] Migration
> Do not mix React Context and EchoJS providers in one tree without a plan.

> [!DANGER]
> Never commit API keys to the repository.
```

## Supported types

| Marker | Purpose |
| --- | --- |
| `NOTE` | Neutral context |
| `INFO` | Extra information |
| `TIP` | Helpful shortcut |
| `RECOMMENDATION` | Preferred approach in EchoJS |
| `WARNING` / `CAUTION` | Risk or caveat |
| `DANGER` / `ERROR` | Serious mistake or hazard |
| `IMPORTANT` | Critical to read |

## Fence syntax

:::callout type=recommendation
Use providers at the app root only — not inside feature views.
:::

:::callout type=danger
Disabling strict context checks in production hides missing provider errors.
:::

## Related

- [State overview](/docs/state/overview)
- [Architecture overview](/docs/architecture/overview)
