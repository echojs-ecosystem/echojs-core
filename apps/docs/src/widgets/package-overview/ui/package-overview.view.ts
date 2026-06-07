import {
  type Child,
  createView,
  div,
  h2,
  h3,
  p,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import { CodeBlock } from '@widgets/code-block'
import { EcosystemPackageCard } from '@widgets/ecosystem'
import {
  ecosystemPackages,
  type EcosystemPackage,
} from '@widgets/ecosystem/constants/ecosystem-packages.js'
import {
  getPackageOverview,
  type PackageOverviewData,
} from '@widgets/package-overview/constants/package-overview.data.js'
import {
  featureCardStyles,
  packageOverviewStyles,
} from '@widgets/package-overview/ui/package-overview.view.styles.js'
import { getPackageVersion } from '@core/content/ecosystem-version.generated.js'

const ui = packageOverviewStyles()
const pillar = featureCardStyles()

export type PackageOverviewViewProps = { packageId: string }

const toEcosystemCard = (id: string): EcosystemPackage | null => {
  const listed = ecosystemPackages.find((p) => p.shortName === id)
  if (listed) return listed
  const data = getPackageOverview(id)
  if (!data) return null
  return {
    name: data.npmPackage,
    shortName: data.id,
    description: data.tagline,
    contentId: `packages/${data.id}`,
    icon: data.icon,
  }
}

const ListSection = (props: { title: string; items: string[] }): Child =>
  div(null, [
    h3({ class: ui.sectionTitle() }, props.title),
    div(
      { class: ui.list() },
      props.items.map((item) =>
        div({ class: ui.listItem() }, [
          span({ class: ui.listBullet() }),
          span(null, item),
        ])
      )
    ),
  ])

const OverviewBody = (data: PackageOverviewData): Child => {
  const related = data.relatedIds
    .map(toEcosystemCard)
    .filter((p): p is EcosystemPackage => p !== null)
  const version = getPackageVersion(data.npmPackage)
  const packageLabel = version
    ? `${data.npmPackage}@${version}`
    : data.npmPackage

  return div({ class: ui.root() }, [
    div({ class: ui.hero() }, [
      div({ class: ui.heroGlow() }),
      div({ class: ui.heroInner() }, [
        div({ class: ui.heroIconWrap() }, [
          span({ class: ui.heroIcon() }, data.icon),
        ]),
        div({ class: ui.heroContent() }, [
          data.id === 'framework'
            ? p(
                { class: ui.heroFeaturedBanner() },
                'Recommended starting point'
              )
            : null,
          p({ class: ui.heroEyebrow() }, packageLabel),
          data.heroTitle ? p({ class: ui.heroTitle() }, data.heroTitle) : null,
          p({ class: ui.heroHeadline() }, data.tagline),
          p({ class: ui.heroSummary() }, data.summary),
          div(
            { class: ui.pillRow() },
            data.pills.map((pill) => span({ class: ui.pill() }, pill))
          ),
          NavLink({
            to: docPageByContentId[`packages/${data.id}/installation`]!,
            class: ui.importPathsLink(),
            children: 'Import paths → Installation',
          }),
        ]),
      ]),
    ]),

    data.whyCards && data.whyCards.length > 0
      ? sectionBlock(data.whyTitle ?? 'Why this package', () =>
          div(null, [
            data.whySubtitle
              ? p(
                  { class: 'mt-1 max-w-2xl text-sm text-fg-muted' },
                  data.whySubtitle
                )
              : null,
            div(
              { class: ui.whyGrid() },
              data.whyCards!.map((card) =>
                div({ class: ui.whyCard() }, [
                  span({ class: ui.whyCardIcon() }, card.icon),
                  h3({ class: ui.whyCardTitle() }, card.title),
                  p({ class: ui.whyCardBody() }, card.body),
                ])
              )
            ),
          ])
        )
      : null,

    sectionBlock('Core concepts', () =>
      div(
        { class: ui.pillarGrid() },
        data.pillars.map((card) =>
          div({ class: pillar.root() }, [
            div({ class: pillar.shine() }),
            div({ class: pillar.iconWrap() }, card.icon),
            h3({ class: pillar.title() }, card.title),
            p({ class: pillar.body() }, card.body),
          ])
        )
      )
    ),

    data.lifecycleSteps && data.lifecycleSteps.length > 0
      ? sectionBlock(data.lifecycleTitle ?? 'Lifecycle', () =>
          div(null, [
            data.lifecycleSubtitle
              ? p(
                  { class: 'mt-1 max-w-2xl text-sm text-fg-muted' },
                  data.lifecycleSubtitle
                )
              : null,
            div(
              { class: ui.lifecycleGrid() },
              data.lifecycleSteps!.map((step) =>
                div({ class: ui.lifecycleCard() }, [
                  span({ class: ui.lifecycleStep() }, step.step),
                  p({ class: ui.lifecycleTitle() }, step.title),
                  p({ class: ui.lifecycleBody() }, step.body),
                ])
              )
            ),
          ])
        )
      : null,

    data.codeExample
      ? sectionBlock(data.codeExample.title, () =>
          div({ class: ui.codeSection() }, [
            div({ class: ui.codeSectionTitle() }, data.codeExample!.language),
            CodeBlock({
              language: data.codeExample!.language,
              code: data.codeExample!.code,
            }),
          ])
        )
      : null,

    div({ class: ui.twoCol() }, [
      ListSection({ title: 'Use when', items: data.whenToUse }),
      ListSection({ title: 'Reach for something else', items: data.whenNot }),
    ]),

    data.dependsOn.length > 0
      ? div(null, [
          h3({ class: ui.sectionTitle() }, 'Depends on'),
          div(
            { class: ui.pillRow() },
            data.dependsOn.map((dep) => span({ class: ui.pill() }, dep))
          ),
        ])
      : null,

    data.powers.length > 0
      ? div(null, [
          h3({ class: ui.sectionTitle() }, 'Often paired with'),
          div(
            { class: ui.pillRow() },
            data.powers.map((pkg) =>
              span({ class: ui.pill() }, `@echojs-ecosystem/${pkg}`)
            )
          ),
        ])
      : null,

    sectionBlock('Learn this package', () =>
      div(
        { class: ui.learnGrid() },
        data.learnPath.map((step) =>
          NavLink({
            to: docPageByContentId[step.contentId]!,
            class: ui.learnCard(),
            children: [
              p({ class: ui.learnTitle() }, step.title),
              p({ class: ui.learnDesc() }, step.description),
              span({ class: ui.learnLink() }, ['Open', span(null, '→')]),
            ],
          })
        )
      )
    ),

    related.length > 0
      ? sectionBlock('Related packages', () =>
          div(
            { class: ui.relatedGrid() },
            related.map((pkg) => EcosystemPackageCard(pkg))
          )
        )
      : null,
  ])
}

const sectionBlock = (title: string, body: () => Child): Child =>
  div({ class: ui.section() }, [
    h2({ class: ui.sectionTitle() }, title),
    body(),
  ])

export const PackageOverviewView = createView(
  (props: PackageOverviewViewProps): Child => {
    const data = getPackageOverview(props.packageId)
    if (!data) {
      return p(
        { class: 'text-sm text-fg-muted' },
        `Unknown package overview: ${props.packageId}`
      )
    }
    return OverviewBody(data)
  },
  'PackageOverviewView'
)
