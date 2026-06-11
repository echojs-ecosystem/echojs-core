import { doc } from '../doc-nav-item'
import { createDocNavSection } from '../doc-nav-section'

export const bestPracticesNavSection = createDocNavSection(
  'best-practices',
  'Best Practices',
  [
    doc('best-practices/overview', 'Overview', {
      keywords: ['patterns', 'do and dont', 'checklist', 'architecture', 'models'],
    }),
    doc('best-practices/routing', 'Routing', {
      keywords: ['NavLink', 'beforeLoad', 'guards', 'lazy routes', 'layouts'],
    }),
    doc('best-practices/models', 'Models', {
      keywords: ['createModel', 'VM', 'effects', 'query', 'lifetime'],
    }),
    doc('best-practices/views', 'Views', {
      keywords: ['createView', 'createComponent', 'Show', 'List', 'composition'],
    }),
    doc('best-practices/styling', 'Styling', {
      keywords: ['tailwind-variants', 'tv', 'view.styles', 'cn'],
    }),
    doc('best-practices/new-screen', 'New Screen', {
      keywords: ['workflow', 'pages', 'feature-first', 'echo-architect'],
    }),
  ]
)
