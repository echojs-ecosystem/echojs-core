import { createView, type Child } from "@echojs-ecosystem/framework/hyperdom";
import { NavLink } from "@echojs-ecosystem/framework/router/hyperdom";
import { div, p, span } from "@echojs-ecosystem/framework/hyperdom";
import { docPageByContentId } from "@app/router/doc-pages.js";
import { frameworkComparisonArticles } from "@widgets/framework-comparison/constants/framework-comparison.data.js";
import { frameworkComparisonStyles } from "@widgets/framework-comparison/ui/framework-comparison.view.styles.js";
import { NavIcon } from "@widgets/icons/nav-icons.js";
import type { FrameworkNavIconId } from "@widgets/icons/framework-nav-icons.js";

const cmp = frameworkComparisonStyles();

const frameworkIconId: Record<
  (typeof frameworkComparisonArticles)[number]["frameworkId"],
  FrameworkNavIconId
> = {
  react: "fw-react",
  vue: "fw-vue",
  angular: "fw-angular",
  solid: "fw-solid",
  svelte: "fw-svelte",
};

const frameworkIconTone: Record<
  (typeof frameworkComparisonArticles)[number]["frameworkId"],
  string
> = {
  react: "text-[#61dafb]",
  vue: "text-[#42b883]",
  angular: "text-[#dd0031] dark:text-[#f5476a]",
  solid: "text-[#4a7ab8] dark:text-[#6b9bd1]",
  svelte: "text-[#ff6b3d]",
};

const frameworkShortName: Record<
  (typeof frameworkComparisonArticles)[number]["frameworkId"],
  string
> = {
  react: "React",
  vue: "Vue",
  angular: "Angular",
  solid: "Solid",
  svelte: "Svelte",
};

export const ComparisonGuideCardsView = createView(
  (_vm: void): Child =>
    div({ class: cmp.deepDiveGrid() }, [
      ...frameworkComparisonArticles.map((article) => {
        if (!article.available || !("contentId" in article)) {
          return div({ class: cmp.deepDiveCardSoon() }, [
            span({ class: cmp.deepDiveCardSoonLabel() }, article.title),
            span({ class: cmp.deepDiveCardSoonBadge() }, "Soon"),
          ]);
        }

        const iconId = frameworkIconId[article.frameworkId];
        const iconClass = frameworkIconTone[article.frameworkId];

        return NavLink({
          to: docPageByContentId[article.contentId]!,
          class: cmp.deepDiveCard(),
          children: [
            div({ class: cmp.deepDiveCardGlow() }),
            div({ class: cmp.deepDiveCardIconWrap() }, [
              NavIcon(iconId, `${cmp.deepDiveCardIcon()} ${iconClass}`),
            ]),
            div({ class: cmp.deepDiveCardCopy() }, [
              p({ class: cmp.deepDiveCardEyebrow() }, [
                "EchoJS",
                span(null, " vs "),
                frameworkShortName[article.frameworkId],
              ]),
              p({ class: cmp.deepDiveCardTitle() }, article.title),
            ]),
            div({ class: cmp.deepDiveCardFooter() }, [
              span({ class: "text-[10px] font-medium uppercase tracking-wide text-fg-subtle" }, "Guide"),
              span({ class: cmp.deepDiveCardArrow() }, "→"),
            ]),
          ],
        });
      }),
    ]),
  "ComparisonGuideCardsView",
);
