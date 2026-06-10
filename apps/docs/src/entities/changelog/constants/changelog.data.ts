import type { ChangelogRelease } from '@entities/changelog/types/changelog.types'

const ecosystemPackages = (version: string): string[] => [
  `@echojs-ecosystem/reactivity@${version}`,
  `@echojs-ecosystem/hyperdom@${version}`,
  `@echojs-ecosystem/framework@${version}`,
  `@echojs-ecosystem/router@${version}`,
  `@echojs-ecosystem/store@${version}`,
  `@echojs-ecosystem/async@${version}`,
  `@echojs-ecosystem/form@${version}`,
  `@echojs-ecosystem/persist@${version}`,
  `@echojs-ecosystem/url-state@${version}`,
  `@echojs-ecosystem/i18n@${version}`,
  `@echojs-ecosystem/ui@${version}`,
  `@echojs-ecosystem/devtools@${version}`,
  `@echojs-ecosystem/core@${version}`,
]

export const changelogReleases: ChangelogRelease[] = [
  {
    slug: '0-6-0',
    version: '0.6.0',
    date: '2026-06-01',
    title: 'EchoJS 0.6 — docs API & navigation',
    summary:
      'Coordinated ecosystem release — docs API pages, navigation refactor, and aligned package versions.',
    tags: ['release', 'docs'],
    highlights: [
      'Every public package ships at 0.6.0 with shared typing and workspace tooling.',
      'The docs site adds flat package API navigation (Usage → Type Declarations → API), a unified Getting Started overview, and improved sidebar structure.',
    ],
    sections: [
      {
        title: 'Minor Changes',
        items: [
          'Ecosystem-wide 0.6.0 release with synchronized semver across packages.',
          'Docs: merged introduction pages into a single Overview; refactored nav into section modules.',
          'Docs: generated API reference pages for all ecosystem packages.',
        ],
      },
      {
        title: 'Patch Changes',
        items: [
          'Updated dependencies across framework, router, reactivity, hyperdom, store, query, form, persist, url-state, i18n, ui, devtools, and core.',
        ],
      },
    ],
    packages: ecosystemPackages('0.6.0'),
  },
  {
    slug: '0-5-0',
    version: '0.5.0',
    date: '2026-05-15',
    title: 'EchoJS 0.5 — the ecosystem ships as one',
    summary:
      'First coordinated cut across the monorepo — shared semver, current APIs in docs, and Architect layer rules.',
    tags: ['release', 'ecosystem'],
    highlights: [
      'Version 0.5 aligns every public package on the same semver. The docs site reflects current APIs; legacy usage.md files give way to guides and API references per package.',
      'Workspace tooling (Architect) enforces the same layer rules documented in Architecture.',
    ],
    sections: [
      {
        title: 'Minor Changes',
        items: [
          'Coordinated 0.5.0 release across the EchoJS ecosystem.',
          'Package docs restructured: guides + API references replace monolithic usage pages.',
        ],
      },
      {
        title: 'Patch Changes',
        items: ['Updated dependencies across all ecosystem packages.'],
      },
    ],
    packages: ecosystemPackages('0.5.0'),
  },
  {
    slug: '0-4-0',
    version: '0.4.0',
    date: '2026-04-10',
    title: 'EchoJS 0.4 — publish pipeline & npm fixes',
    summary:
      'Bun publish pipeline, npm install fixes, and ecosystem-wide dependency updates.',
    tags: ['release', 'tooling'],
    highlights: [
      'Release 0.4.0 improves the publish pipeline with Bun and fixes npm install paths for consumers outside the monorepo.',
    ],
    sections: [
      {
        title: 'Minor Changes',
        items: [
          'Bun publish pipeline and npm install fixes for ecosystem packages.',
          'Dependency and typing updates across reactivity, hyperdom, router, store, query, form, persist, url-state, i18n, ui, and devtools.',
        ],
      },
    ],
    packages: ecosystemPackages('0.4.0'),
  },
  {
    slug: '0-3-0',
    version: '0.3.0',
    date: '2026-03-01',
    title: 'EchoJS 0.3 — aligned dependencies',
    summary: 'Ecosystem version bump with dependency alignment across all packages.',
    tags: ['release', 'ecosystem'],
    highlights: [
      'All packages move to 0.3.0 with updated cross-package dependencies and consistent exports.',
    ],
    sections: [
      {
        title: 'Minor Changes',
        items: ['Coordinated 0.3.0 version bump across the monorepo.'],
      },
      {
        title: 'Patch Changes',
        items: ['Updated dependencies across all ecosystem packages.'],
      },
    ],
    packages: ecosystemPackages('0.3.0'),
  },
  {
    slug: '0-2-0',
    version: '0.2.0',
    date: '2026-02-01',
    title: 'EchoJS 0.2 — release flow improvements',
    summary: 'Release flow improvements and tooling updates for the monorepo.',
    tags: ['release', 'tooling'],
    highlights: [
      'Improved release flow and changeset integration for coordinated publishes.',
    ],
    sections: [
      {
        title: 'Minor Changes',
        items: ['Updated release flow and workspace publish tooling.'],
      },
      {
        title: 'Patch Changes',
        items: ['Updated dependencies across all ecosystem packages.'],
      },
    ],
    packages: ecosystemPackages('0.2.0'),
  },
  {
    slug: '0-1-0',
    version: '0.1.0',
    date: '2026-01-15',
    title: 'EchoJS 0.1 — initial public release',
    summary:
      'Initial public release of the EchoJS ecosystem — reactivity, HyperDOM, framework, router, and supporting packages.',
    tags: ['release', 'launch'],
    highlights: [
      'First public release: signal-first reactivity, HyperDOM rendering, typed routing, providers, query, store, form, persist, url-state, i18n, ui, and devtools.',
    ],
    sections: [
      {
        title: 'Minor Changes',
        items: [
          'Initial public release of the EchoJS ecosystem packages.',
          'Framework meta-package bundles router, hyperdom, reactivity, query, store, form, and related services.',
        ],
      },
    ],
    packages: ecosystemPackages('0.1.0'),
  },
]

export const findChangelogReleaseBySlug = (
  slug: string
): ChangelogRelease | undefined =>
  changelogReleases.find((release) => release.slug === slug)
