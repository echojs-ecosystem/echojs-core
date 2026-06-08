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

/** Example layer stack for the landing page — teams define their own order in architect.config.ts. */
export const architectureLayers: ArchitectureLayer[] = [
  { id: 'app', name: 'app', hint: 'bootstrap & routes', emphasis: 'default' },
  { id: 'pages', name: 'pages', hint: 'route views', emphasis: 'default' },
  { id: 'widgets', name: 'widgets', hint: 'composite UI', emphasis: 'foundation' },
  { id: 'features', name: 'features', hint: 'user flows', emphasis: 'default' },
  { id: 'entities', name: 'entities', hint: 'model · view', emphasis: 'default' },
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
      widgets: abstraction({ name: "widgets", children: { "*": widgetSlice } }),
      features: abstraction({ name: "features", children: { "*": featureSlice } }),
      entities: abstraction({ name: "entities", children: { "*": entitySlice } }),
      core: coreLayer,
    },
    rules: [
      dependenciesDirection(
        ["app", "pages", "widgets", "features", "entities", "core"],
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
    allowed: app <= pages <= widgets <= features <= entities <= core
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
      'Your team picks the stack — Architect only enforces the order you declare.',
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
      'Same lint locally and in CI — tuned to whatever layers you configured.',
  },
]

/** Landing-page digest — why a lintable layer stack helps (example layout). */
export const architectureAdvantages: ArchitectureAdvantage[] = [
  {
    id: 'layers',
    title: 'Layers, one direction',
    summary:
      'Split the repo by responsibility and pick an import order. In this example, higher layers depend on lower ones — not the only layout that works.',
    highlight: 'Rename, reorder, or add layers in architect.config.ts.',
    docId: 'architecture/overview',
  },
  {
    id: 'feature-first',
    title: 'Feature-first slices',
    summary:
      'One pattern EchoJS apps often use: group by what users do, not by components/, hooks/, utils/ at the repo root.',
    highlight: 'Adapt the slice names to your product — the linter follows your config.',
    docId: 'architecture/feature-first',
  },
  {
    id: 'model-view',
    title: 'Model · View split',
    summary:
      'A convention many teams adopt: models own signals and data; views map a VM to HyperDOM. Optional, but easy to test when you do.',
    highlight: 'Not required everywhere — useful at pages, widgets, and features.',
    docId: 'architecture/models',
  },
  {
    id: 'architect',
    title: 'Architect lints imports',
    summary:
      'Encode whichever stack you chose once — echo-architect reports forbidden imports with file paths, not opinions about folder names.',
    highlight: 'apps/docs and apps/example each ship their own config.',
    docId: 'packages/architect/guides/layers',
  },
]
