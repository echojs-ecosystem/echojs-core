import { doc } from '../doc-nav-item'
import { createDocNavSection } from '../doc-nav-section'

export const architectureNavSection = createDocNavSection(
  'architecture',
  'Architecture',
  [
    doc('architecture/overview', 'Overview'),
    doc('architecture/feature-first', 'Feature First'),
    doc('architecture/providers', 'Providers'),
    doc('architecture/models', 'Models'),
    doc('architecture/dependency-flow', 'Dependency Flow'),
  ]
)
