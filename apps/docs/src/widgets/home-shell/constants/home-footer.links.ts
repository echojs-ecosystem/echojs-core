import type { ContentId } from '@core/content/types'

export type FooterDocLink = {
  label: string
  contentId: ContentId
}

export type FooterHrefLink = {
  label: string
  href: string
  external?: boolean
}

export type FooterLink = FooterDocLink | FooterHrefLink

export type FooterColumn = {
  title: string
  links: FooterLink[]
}

export const homeFooterColumns: FooterColumn[] = [
  {
    title: 'Documentation',
    links: [
      { label: 'Getting Started', contentId: 'getting-started/installation' },
      { label: 'Architecture', contentId: 'architecture/overview' },
      { label: 'Packages', contentId: 'packages/framework' },
      { label: 'Comparisons', contentId: 'comparisons/index' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Changelog', href: '/docs/changelog' },
      { label: 'Roadmap', href: '/docs/roadmap' },
      { label: 'Sponsors', href: '/sponsors' },
    ],
  },
  {
    title: 'Community',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/echojs/echojs',
        external: true,
      },
    ],
  },
]
