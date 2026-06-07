import type { ContentId } from '@core/content/types.js'

export type ArchitectureLayer = {
  id: string
  name: string
  hint: string
  emphasis: 'default' | 'foundation'
}

export type ArchitectureAdvantage = {
  id: string
  title: string
  summary: string
  highlight: string
  docId: ContentId
}

/** Visual layer stack — matches apps/docs architect.config.ts order. */
export const architectureLayers: ArchitectureLayer[] = [
  { id: 'app', name: 'app', hint: 'bootstrap & routes', emphasis: 'default' },
  { id: 'pages', name: 'pages', hint: 'route views', emphasis: 'default' },
  { id: 'entities', name: 'entities', hint: 'model · view', emphasis: 'default' },
  { id: 'widgets', name: 'widgets', hint: 'composite UI', emphasis: 'foundation' },
  { id: 'features', name: 'features', hint: 'user flows', emphasis: 'default' },
  { id: 'core', name: 'core', hint: 'content & providers', emphasis: 'default' },
]

export type ArchitectCodePanel = {
  id: string
  label: string
  file: string
  badge: string
  lang: string
  code: string
  caption: string
}

export const architectConfigExample = `import { defineConfig, dependenciesDirection } from "@echojs-ecosystem/architect"

export default defineConfig({
  root: abstraction({
    name: "src",
    children: {
      app: appLayer,
      pages: abstraction({ name: "pages", children: { "*": pageSlice } }),
      entities: abstraction({ name: "entities", children: { "*": entitySlice } }),
      widgets: abstraction({ name: "widgets", children: { "*": widgetSlice } }),
      features: abstraction({ name: "features", children: { "*": featureSlice } }),
      core: coreLayer,
    },
    rules: [
      dependenciesDirection(
        ["app", "pages", "entities", "widgets", "features", "core"],
        { allowDownward: ["**/app/router/**"] },
      ),
    ],
  }),
})`

export const architectViolationExample = `// widgets/site-header/model/site-header.model.ts
import { createModel } from "@echojs-ecosystem/framework/hyperdom"
import { blogPage } from "@pages/blog" // ✗ widgets → pages

export const createSiteHeaderModel = createModel(() => ({
  blogHref: () => blogPage.path,
}), "SiteHeaderModel")`

export const architectCiOutput = `$ bun run architect

src/widgets/site-header/model/site-header.model.ts
  ✘ Forbidden dependency "widgets" <= "pages".
    allowed: app <= pages <= entities <= widgets <= features <= core
    import { blogPage } from "@pages/blog"
           ─────────────────────────────────

Found 1 error in 1 file · exit 1`

export const architectCodePanels: ArchitectCodePanel[] = [
  {
    id: 'config',
    label: 'Rule',
    file: 'architect.config.ts',
    badge: 'define',
    lang: 'typescript',
    code: architectConfigExample,
    caption:
      'One ordered stack for the whole repo — imports may only flow downward.',
  },
  {
    id: 'violation',
    label: 'Leak',
    file: 'site-header.model.ts',
    badge: 'blocked',
    lang: 'typescript',
    code: architectViolationExample,
    caption:
      'Convenient shortcuts become cross-layer imports. Architect names the offender.',
  },
  {
    id: 'ci',
    label: 'CI',
    file: 'terminal',
    badge: 'exit 1',
    lang: 'bash',
    code: architectCiOutput,
    caption:
      'Run echo-architect lint locally and in CI — same check as this docs site.',
  },
]

/** Landing-page digest — why the layered stack is a competitive advantage. */
export const architectureAdvantages: ArchitectureAdvantage[] = [
  {
    id: 'layers',
    title: 'Six layers, one direction',
    summary:
      'Each folder has a single job. Imports flow downward only — core never imports pages, features stay isolated.',
    highlight: 'Refactors stay local as the codebase grows.',
    docId: 'architecture/overview',
  },
  {
    id: 'feature-first',
    title: 'Feature-first by default',
    summary:
      'Organize by what users do — search, checkout, locale — not by components/, hooks/, utils/ at the repo root.',
    highlight: 'Onboarding maps to product areas, not file types.',
    docId: 'architecture/feature-first',
  },
  {
    id: 'model-view',
    title: 'Model · View at every level',
    summary:
      'Models own signals, effects, and data; views map a VM to HyperDOM. No fetch in views, no DOM in models.',
    highlight: 'Test behavior without rendering the tree.',
    docId: 'architecture/models',
  },
  {
    id: 'architect',
    title: 'Architect lints imports',
    summary:
      'declare dependenciesDirection once — echo-architect reports forbidden upward imports with file paths.',
    highlight: 'Ship the same lint in CI as apps/docs and apps/example.',
    docId: 'packages/architect/guides/layers',
  },
]
