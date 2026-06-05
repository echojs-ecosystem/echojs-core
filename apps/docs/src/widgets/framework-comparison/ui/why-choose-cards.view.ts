import { createView, type Child } from "@echojs/hyperdom";
import { div, p, span } from "@echojs/hyperdom";
import { whyChooseEchoCards } from "@shared/home/framework-comparison.js";
import { frameworkComparisonStyles } from "@shared/styles/framework-comparison.js";

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
