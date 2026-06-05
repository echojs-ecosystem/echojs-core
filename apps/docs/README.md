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
  app/          bootstrap, router, styles
  core/         app-wide shared modules
    providers/  query, ui, i18n, theme
    styles/     tailwind-variants helpers
    content/    markdown engine
    seo/        meta tags
    ui/         bind-model-view, …
  content/      markdown sources
  entities/     routes
  pages/        home + doc shell
  widgets/      sidebar, search, code blocks
```

## Styling

- **Tokens** — `src/app/styles/global.css` (`@theme` colors/fonts, `@layer base` for `body`)
- **Components** — co-located `*.styles.ts` via `tv()` from `tailwind-variants`
- **Merge** — `cn()` in `src/core/styles/cn.ts` (`tailwind-merge`) when combining classes manually

Example:

```ts
import { cn } from "@core/styles/cn.js";

NavLink({ class: cn(navLinkStyles(), isActive && navLinkStyles({ active: true })) });
```

## Roadmap

See `src/core/content/future.ts` for planned features (playground, versioning, i18n docs).
