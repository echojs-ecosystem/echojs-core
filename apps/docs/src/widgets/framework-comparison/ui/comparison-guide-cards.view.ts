import {
  type Child,
  createView,
  div,
  p,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import { frameworkComparisonArticles } from '@widgets/framework-comparison/constants/framework-comparison.data.js'
import { frameworkComparisonStyles } from '@widgets/framework-comparison/ui/framework-comparison.view.styles.js'
import { FrameworkLogo } from '@widgets/framework-comparison/ui/framework-logo.js'

const cmp = frameworkComparisonStyles()

const frameworkShortName: Record<
  (typeof frameworkComparisonArticles)[number]['frameworkId'],
  string
> = {
  react: 'React',
  vue: 'Vue',
  angular: 'Angular',
  solid: 'Solid',
  svelte: 'Svelte',
}

export const ComparisonGuideCardsView = createView(
  (_vm: void): Child =>
    div(
      { class: cmp.deepDiveGrid() },
      frameworkComparisonArticles.map((article) => {
        if (!article.available || !('contentId' in article)) {
          return div({ class: cmp.deepDiveCardSoon() }, [
            span({ class: cmp.deepDiveCardSoonLabel() }, article.title),
            span({ class: cmp.deepDiveCardSoonBadge() }, 'Soon'),
          ])
        }

        return NavLink({
          to: docPageByContentId[article.contentId]!,
          class: cmp.deepDiveCard(),
          children: [
            div({ class: cmp.deepDiveCardGlow() }),
            div({ class: cmp.deepDiveCardIconWrap() }, [
              FrameworkLogo({
                id: article.frameworkId,
                className: cmp.deepDiveCardIcon(),
              }),
            ]),
            div({ class: cmp.deepDiveCardCopy() }, [
              p({ class: cmp.deepDiveCardEyebrow() }, [
                'EchoJS',
                span(null, ' vs '),
                frameworkShortName[article.frameworkId],
              ]),
              p({ class: cmp.deepDiveCardTitle() }, article.title),
            ]),
            div({ class: cmp.deepDiveCardFooter() }, [
              span(
                {
                  class:
                    'text-[10px] font-medium uppercase tracking-wide text-fg-subtle',
                },
                'Guide'
              ),
              span({ class: cmp.deepDiveCardArrow() }, '→'),
            ]),
          ],
        })
      })
    ),
  'ComparisonGuideCardsView'
)
