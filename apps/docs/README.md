# EchoJS Documentation Site

Official documentation for EchoJS — built with EchoJS, not Docusaurus/VitePress/Nextra.

## Stack

- `@echojs/framework`, `@echojs/router`, `@echojs/ui`, `@echojs/query`, `@echojs/store`, `@echojs/url-state`
- Tailwind CSS v4 + **tailwind-variants** (`tv()`)
- Shiki (syntax highlighting)
- Markdown content under `src/content/` (lazy-loaded via Vite glob)

## Develop

```bash
bun install
bun run dev --filter @echojs/docs
```

Opens at http://localhost:3001

## Structure

```
src/
  app/          bootstrap, providers, styles
  content/      markdown sources
  entities/     routes
  pages/        home + doc shell
  shared/
    styles/     tailwind-variants (shell, home, doc, search, …)
    content/    markdown engine
    search/     local index
    seo/        meta tags
    theme/      dark mode store
  widgets/      sidebar, search, code blocks
```

## Styling

- **Tokens** — `src/app/styles/global.css` (`@theme` colors/fonts, `@layer base` for `body`)
- **Components** — `src/shared/styles/*.ts` via `tv()` from `tailwind-variants`
- **Merge** — `cn()` helper (`tailwind-merge`) when combining classes manually

Example:

```ts
import { navLinkStyles } from "@shared/styles/index.js";

NavLink({ class: navLinkStyles(), activeClass: navLinkStyles({ active: true }) });
```

## Roadmap

See `src/shared/content/future.ts` for planned features (playground, versioning, i18n docs).
