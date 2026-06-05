---
title: Project layout
description: Directory structure of the EchoJS documentation app.
---

# Project layout

```
apps/docs/
├── public/
│   ├── locales/          # i18n JSON
│   └── llms.txt          # compact agent rules (plain text)
├── src/
│   ├── app/              # bootstrap, providers, global.css
│   ├── content/          # markdown → DocDocument
│   ├── entities/__routes__/
│   ├── pages/            # route features (MV structure)
│   ├── shared/
│   │   ├── content/      # nav.ts, agents-nav.ts, parser
│   │   ├── styles/       # tailwind-variants
│   │   ├── ui/           # bind-model-view.ts
│   │   └── …
│   └── widgets/          # shared UI (MV structure)
```

## `pages/` — one route per folder

| Page | Entry |
|------|--------|
| Home | `pages/home/home.page.ts` |
| Doc article | `pages/doc/` + `createDocPage(contentId)` |
| Sponsors | `pages/sponsors/sponsors.page.ts` |

Each folder should contain **`constants/`**, **`types/`**, **`model/`**, **`ui/`** when the page has logic.

## `widgets/` — reusable blocks

Examples: `site-header`, `code-block`, `docs-shell`, `package-install`.

Each widget:

```
widgets/<name>/
  model/          # optional if stateless
  ui/
  types/          # optional
  index.ts        # public export
```

## `core/content/`

- `nav.ts` — main sidebar sections
- `agents-nav.ts` — **For agents** sidebar block
- `allDocsNavItems` — drives routes + search

## Adding a doc page

1. `src/content/guides/my-topic.md`
2. Add `item("my-topic", "My Topic", "guides/my-topic")` to `docsNavSections`
3. URL: `/docs/guides/my-topic`

## Adding agent-facing rules

1. Edit markdown under `src/content/agents/`
2. Update `public/llms.txt` if the short contract changes
3. Keep `agents-nav.ts` in sync with new pages
