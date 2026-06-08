import { type Child, div, h2, p, section } from '@echojs-ecosystem/framework/hyperdom'
import { cn } from '@core/styles/cn'

import { homeSectionStyles } from '@entities/home/ui/home-section.view.styles'

const sectionStyles = homeSectionStyles()

export type HomeSectionProps = {
  eyebrow: string
  title: string
  lead?: Child
  children: Child
  class?: string
}

export const HomeSection = ({
  eyebrow,
  title,
  lead,
  children,
  class: className,
}: HomeSectionProps): Child =>
  section({ class: cn(sectionStyles.section(), className) }, [
    div({ class: sectionStyles.inner() }, [
      div({ class: sectionStyles.header() }, [
        p({ class: sectionStyles.eyebrow() }, eyebrow),
        h2({ class: sectionStyles.title() }, title),
        lead ? div({ class: sectionStyles.lead() }, lead) : null,
      ]),
      children,
    ]),
  ])
