import { doc } from '../doc-nav-item'
import { createDocNavSection } from '../doc-nav-section'

export const guidesNavSection = createDocNavSection('guides', 'Guides', [
  doc('guides/reactivity', 'Reactivity', {
    keywords: ['signal', 'computed', 'effect', 'createModel', 'batch'],
  }),
  doc('guides/routing', 'Routing'),
  doc('guides/data-fetching', 'Data Fetching'),
  doc('guides/forms', 'Forms'),
  doc('guides/conventions', 'Conventions', {
    keywords: ['naming', 'signals', 'stores', 'createModel', 'createView'],
  }),
  doc('guides/authentication', 'Authentication'),
  doc('guides/internationalization', 'Internationalization'),
  doc('guides/best-practices', 'Best Practices', {
    keywords: ['patterns', 'do and dont', 'checklist', 'architecture', 'models'],
  }),
])
