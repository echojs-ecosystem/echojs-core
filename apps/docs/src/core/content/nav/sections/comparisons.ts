import { doc } from '../doc-nav-item'
import { createDocNavSection } from '../doc-nav-section'

export const comparisonsNavSection = createDocNavSection(
  'comparisons',
  'Comparisons',
  [
    doc('comparisons/index', 'Overview', {
      keywords: ['compare', 'react', 'vue', 'angular', 'solid', 'svelte'],
    }),
    doc('comparisons/react', 'EchoJS vs React', {
      keywords: [
        'react',
        'hooks',
        'redux',
        'react query',
        'react router',
        'ecosystem',
      ],
    }),
    doc('comparisons/vue', 'EchoJS vs Vue', {
      keywords: ['vue', 'pinia', 'vue router', 'nuxt', 'composition api'],
    }),
    doc('comparisons/angular', 'EchoJS vs Angular', {
      keywords: [
        'angular',
        'rxjs',
        'ngrx',
        'signals',
        'dependency injection',
      ],
    }),
    doc('comparisons/solid', 'EchoJS vs Solid', {
      keywords: ['solid', 'signals', 'jsx', 'solidstart'],
    }),
    doc('comparisons/svelte', 'EchoJS vs Svelte', {
      keywords: ['svelte', 'runes', 'sveltekit', 'compiler'],
    }),
  ]
)
