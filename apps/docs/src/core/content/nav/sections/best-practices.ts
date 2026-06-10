import { doc } from '../doc-nav-item'
import { createDocNavSection } from '../doc-nav-section'

export const bestPracticesNavSection = createDocNavSection(
  'best-practices',
  'Best Practices',
  [
    doc('best-practices/overview', 'Overview', {
      keywords: ['patterns', 'do and dont', 'checklist', 'architecture', 'models'],
    }),
  ]
)
