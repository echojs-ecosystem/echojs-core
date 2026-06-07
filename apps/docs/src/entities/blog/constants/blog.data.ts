import type { BlogCategory, BlogPost } from '@entities/blog/types/blog.types.js'

export const blogCategoryLabels: Record<BlogCategory, string> = {
  announcement: 'Announcement',
  release: 'Release',
  tutorial: 'Tutorial',
  engineering: 'Engineering',
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'echojs-0-5-ecosystem-release',
    title: 'EchoJS 0.5 — the ecosystem ships as one',
    excerpt:
      'Reactivity, HyperDOM, framework, router, store, query, form, and architect align on 0.5 with shared typing and docs.',
    date: '2026-05-15',
    author: 'EchoJS team',
    category: 'release',
    tags: ['release', 'ecosystem'],
    readingMinutes: 4,
    body: [
      'Version 0.5 is the first coordinated cut across the monorepo: every public package shares the same semver, the docs site reflects current APIs, and workspace tooling (Architect) enforces the same layer rules we document.',
      'If you are upgrading from earlier snapshots, start with the Installation guide and the package overview pages — legacy usage.md files are gone in favor of guides and API references per package.',
      'Next up: CLI scaffolding and a DevTools overlay. Track progress on the Roadmap page or open a GitHub discussion if you hit a migration snag.',
    ],
  },
  {
    slug: 'documentation-site-launch',
    title: 'A new docs site — guides, comparisons, and live playgrounds',
    excerpt:
      'The EchoJS documentation is now a first-class app: sidebar navigation, package playgrounds, and framework comparisons.',
    date: '2026-04-28',
    author: 'EchoJS team',
    category: 'announcement',
    tags: ['docs', 'dx'],
    readingMinutes: 3,
    body: [
      'We rebuilt apps/docs on the same stack we recommend for products: feature slices, signal-driven models, and HyperDOM views without JSX.',
      'Each package page follows a modern layout — overview, installation, guides, API, examples, and an optional playground. Comparisons against React, Vue, Angular, Solid, and Svelte help teams evaluate EchoJS without leaving the site.',
      'Search, theme toggle, and version dropdown are wired through client stores and URL-friendly patterns documented in the State section.',
    ],
  },
  {
    slug: 'introducing-echojs-form',
    title: 'Introducing @echojs-ecosystem/form',
    excerpt:
      'Field trees, createForm, bindField, and Standard Schema validation — form state that stays out of global stores.',
    date: '2026-03-12',
    author: 'EchoJS team',
    category: 'release',
    tags: ['form', 'validation'],
    readingMinutes: 5,
    body: [
      'Form state belongs to user input, not to your app-wide store. createField and createForm give you touched/dirty metadata, field-level errors, and optional Zod (or any Standard Schema) validation on submit.',
      'bindField connects native inputs and UI primitives in HyperDOM. For dynamic rows inside List, use controlledValue: true on text fields so values survive re-renders.',
      'The Forms guide walks through login flows, field arrays, and where to place models in a feature-first layout.',
    ],
  },
  {
    slug: 'signals-over-hooks',
    title: 'Why we reach for signals instead of hooks',
    excerpt:
      'Fine-grained reactivity, explicit data flow, and models that are easy to test without a renderer harness.',
    date: '2026-02-06',
    author: 'EchoJS team',
    category: 'engineering',
    tags: ['reactivity', 'architecture'],
    readingMinutes: 6,
    body: [
      'Hooks bundle state with the component tree. Signals separate reactive data from views: models own mutations, views read .value() inside reactive children, and you can unit-test behavior without mounting a tree.',
      'EchoJS is not anti-React — many teams adopt signals incrementally. The comparisons section maps familiar patterns (useState, useEffect, React Query) to createStore, createQuery, and createModel.',
      'If you are new to the mental model, start with the Reactivity package examples: counter, shopping cart, and async search.',
    ],
  },
  {
    slug: 'architect-feature-slices',
    title: 'Architect: keep feature slices honest',
    excerpt:
      'Lint import boundaries between app, pages, entities, widgets, and core — the same layers we use in apps/docs.',
    date: '2026-01-20',
    author: 'EchoJS team',
    category: 'tutorial',
    tags: ['architect', 'tooling'],
    readingMinutes: 4,
    body: [
      '@echojs-ecosystem/architect encodes dependency direction and public APIs as code. Run echo-architect lint in CI to catch widgets importing pages or entities reaching into app internals.',
      'apps/docs is the reference configuration: pages own routes, entities own MV slices, widgets compose UI, and core holds content and SEO utilities.',
      'See the Architect package guides for presets, CI integration, and how to define your own abstractions.',
    ],
  },
]

export const findBlogPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug)
