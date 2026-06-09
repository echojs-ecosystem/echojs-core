import type { DocsNavItem, DocsNavSection } from './types'
import { createDocNavItem } from './nav/doc-nav-item'
import { createDocNavSection } from './nav/doc-nav-section'

export const agentsNavSection: DocsNavSection = createDocNavSection(
  'agents',
  'For agents',
  []
)

export const agentsNavItems: DocsNavItem[] = [
  createDocNavItem('agents/llms-txt', 'LLMs.txt', {
    keywords: ['llms', 'cursor', 'copilot', 'ai', 'rules'],
  }),
  createDocNavItem('agents/agents', 'AGENTS.md', {
    badge: 'Reference',
    keywords: ['agents', 'contributing', 'conventions', 'architecture'],
  }),
  createDocNavItem('agents/model-and-view', 'Model & View', {
    keywords: ['createModel', 'createView', 'hyperdom', 'vm'],
  }),
  createDocNavItem('agents/project-layout', 'Project layout', {
    keywords: ['folders', 'structure', 'feature', 'widget'],
  }),
]
