import { doc } from '../doc-nav-item'
import { createDocNavSection } from '../doc-nav-section'

export const apiNavSection = createDocNavSection('api', 'API Reference', [
  doc('api/index', 'API Overview', {
    keywords: ['api', 'reference'],
  }),
])
