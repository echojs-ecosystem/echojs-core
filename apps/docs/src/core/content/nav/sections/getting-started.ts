import { doc } from '../doc-nav-item'
import { createDocNavSection } from '../doc-nav-section'

export const gettingStartedNavSection = createDocNavSection(
  'getting-started',
  'Getting Started',
  [
    doc('introduction/what-is-echojs', 'Overview', {
      keywords: [
        'echojs',
        'signals',
        'hyperdom',
        'philosophy',
        'jsx',
        'framework',
      ],
    }),
    doc('getting-started/installation', 'Installation'),
    doc('getting-started/first-application', 'First Application'),
    doc('getting-started/project-structure', 'Project Structure'),
  ]
)
