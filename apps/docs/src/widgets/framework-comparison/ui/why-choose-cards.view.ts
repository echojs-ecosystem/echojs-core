import { createView, type Child } from "@echojs-ecosystem/hyperdom";
import { div, p, span } from "@echojs-ecosystem/hyperdom";
import { whyChooseEchoCards } from "@widgets/framework-comparison/constants/framework-comparison.data.js";
import { frameworkComparisonStyles } from "@widgets/framework-comparison/ui/framework-comparison.view.styles.js";

const cmp = frameworkComparisonStyles();

export const WhyChooseCardsView = createView(
  (_vm: void): Child =>
    div({ class: cmp.reasons() }, [
      ...whyChooseEchoCards.map((card) =>
        div({ class: cmp.reasonCard() }, [
          div({ class: cmp.reasonCardGlow() }),
          div({ class: cmp.reasonIconWrap() }, [span({ class: cmp.reasonIcon() }, card.icon)]),
          p({ class: cmp.reasonTitle() }, card.title),
          p({ class: cmp.reasonBody() }, card.body),
        ]),
      ),
    ]),
  "WhyChooseCardsView",
);
