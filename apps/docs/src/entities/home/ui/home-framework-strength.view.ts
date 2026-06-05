import { createView, type Child } from "@echojs/hyperdom";
import { div, span } from "@echojs/hyperdom";
import { vdomCompare } from "@entities/home/constants/home-landing.data.js";
import { HomeCompareCardView } from "@entities/home/ui/home-compare-card.view.js";
import { frameworkStrengthStyles } from "@entities/home/ui/home-framework-strength.view.styles.js";

const strength = frameworkStrengthStyles();

export const HomeFrameworkStrengthView = createView(
  (_vm: void): Child =>
    div({ class: strength.root() }, [
      div({ class: strength.glow() }),
      div({ class: strength.grid() }, [
        HomeCompareCardView({ tone: "muted", data: vdomCompare.traditional }),
        div({ class: strength.echoWrap() }, [
          span({ class: strength.echoBadge() }, "EchoJS"),
          HomeCompareCardView({ tone: "accent", data: vdomCompare.echojs }),
        ]),
      ]),
    ]),
  "HomeFrameworkStrengthView",
);
