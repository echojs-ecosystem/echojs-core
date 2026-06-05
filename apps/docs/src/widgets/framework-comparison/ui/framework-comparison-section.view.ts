import { createView, type Child } from "@echojs-ecosystem/framework/hyperdom";
import { NavLink } from "@echojs-ecosystem/framework/router";
import { div, p, span } from "@echojs-ecosystem/framework/hyperdom";
import { docPageByContentId } from "@app/router/doc-pages.js";
import { performanceDisclaimer } from "@widgets/framework-comparison/constants/framework-comparison.data.js";
import { frameworkComparisonStyles } from "@widgets/framework-comparison/ui/framework-comparison.view.styles.js";
import { ComparisonGuideCardsView } from "@widgets/framework-comparison/ui/comparison-guide-cards.view.js";
import { WhyChooseCardsView } from "@widgets/framework-comparison/ui/why-choose-cards.view.js";
import { FeatureTableView } from "@widgets/framework-comparison/ui/feature-table.view.js";
import { PerformanceTableView } from "@widgets/framework-comparison/ui/performance-table.view.js";

const cmp = frameworkComparisonStyles();

export const FrameworkComparisonSectionView = createView(
  (_vm: void): Child =>
    div(null, [
      div({ class: cmp.block() }, [
        p({ class: cmp.blockTitle() }, "Why choose EchoJS?"),
        p({ class: cmp.blockLead() }, [
          "Compared with mainstream frameworks — same problems, different trade-offs. EchoJS optimizes for surgical updates and an integrated toolkit.",
        ]),
        WhyChooseCardsView(),
        FeatureTableView(),
        div({ class: cmp.deepDive() }, [
          div({ class: cmp.deepDiveLayout() }, [
            div({ class: cmp.deepDiveIntro() }, [
              p({ class: cmp.deepDiveTitle() }, "In-depth comparisons"),
              p({ class: cmp.deepDiveLead() }, [
                "Reactivity models, architecture, state layers, and ecosystem mapping for each mainstream stack.",
              ]),
              NavLink({
                to: docPageByContentId["comparisons/index"]!,
                class: cmp.deepDiveIndexLink(),
                children: ["All comparisons", span(null, "→")],
              }),
            ]),
            ComparisonGuideCardsView(),
          ]),
        ]),
      ]),
      div({ class: cmp.block() }, [
        p({ class: cmp.blockTitle() }, "Performance snapshot"),
        p({ class: cmp.blockLead() }, [
          "Illustrative throughput and footprint metrics (mock). Lower is better for all rows below.",
        ]),
        PerformanceTableView(),
        p({ class: cmp.disclaimer() }, performanceDisclaimer),
      ]),
    ]),
  "FrameworkComparisonSectionView",
);
