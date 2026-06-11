import type { AppMessages } from '@core/providers/i18n'
import type { ContentId } from '@core/content/types'

type FooterColumnTitleKey = {
  [K in keyof AppMessages['footer']['columns']]: `footer.columns.${K & string}`
}[keyof AppMessages['footer']['columns']]

type FooterLinkLabelKey = {
  [K in keyof AppMessages['footer']['links']]: `footer.links.${K & string}`
}[keyof AppMessages['footer']['links']]

export type FooterDocLink = {
  labelKey: FooterLinkLabelKey
  contentId: ContentId
}

export type FooterHrefLink = {
  labelKey: FooterLinkLabelKey
  href: string
  external?: boolean
}

export type FooterLink = FooterDocLink | FooterHrefLink

export type FooterColumn = {
  titleKey: FooterColumnTitleKey
  links: FooterLink[]
}

export const homeFooterColumns: FooterColumn[] = [
  {
    titleKey: 'footer.columns.documentation',
    links: [
      {
        labelKey: 'footer.links.gettingStarted',
        contentId: 'getting-started/installation',
      },
      {
        labelKey: 'footer.links.architecture',
        contentId: 'architecture/overview',
      },
      { labelKey: 'footer.links.packages', contentId: 'packages/framework' },
      { labelKey: 'footer.links.comparisons', contentId: 'comparisons/index' },
    ],
  },
  {
    titleKey: 'footer.columns.project',
    links: [
      { labelKey: 'footer.links.changelog', href: '/docs/changelog' },
      { labelKey: 'footer.links.roadmap', href: '/docs/roadmap' },
      { labelKey: 'footer.links.sponsors', href: '/sponsors' },
    ],
  },
  {
    titleKey: 'footer.columns.community',
    links: [
      {
        labelKey: 'footer.links.github',
        href: 'https://github.com/echojs/echojs',
        external: true,
      },
    ],
  },
]
