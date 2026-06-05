import { createView, type Child } from "@echojs-ecosystem/hyperdom";
import { div, h, h1, main, p } from "@echojs-ecosystem/hyperdom";
import type { SponsorsVM } from "@entities/sponsors/types/sponsors.types.js";
import { becomeSponsorUrl } from "@widgets/sponsors/constants/sponsors.data.js";
import { homeButtonStyles } from "@entities/home/ui/home-button.styles.js";
import { sponsorsPageStyles } from "@entities/sponsors/ui/sponsors.view.styles.js";
import { HomeFooter } from "@widgets/home-shell/index.js";
import { HomeHeader } from "@widgets/home-shell/home-header.js";
import { SponsorsBoard } from "@widgets/sponsors/sponsors-board.js";

const page = sponsorsPageStyles();
const btn = homeButtonStyles();

export const SponsorsView = createView(
  (_vm: SponsorsVM): Child =>
    div({ class: page.root() }, [
      div({ class: page.mesh() }),
      HomeHeader(),
      main({ class: page.main() }, [
        div({ class: page.container() }, [
          div({ class: page.header() }, [
            h1({ class: page.title() }, "Sponsors"),
            p({ class: page.lead() }, [
              "EchoJS is free and open source thanks to sponsors who fund documentation, CI, and core package maintenance. Join them and get your brand in front of thousands of developers.",
            ]),
          ]),
          div({ class: page.tiers() }, [SponsorsBoard({ variant: "full" })]),
          div({ class: page.ctaBlock() }, [
            p({ class: page.ctaTitle() }, "Support the ecosystem"),
            p({ class: page.ctaBody() }, [
              "Gold, Silver, and Bronze tiers include logo placement on the docs site, README mentions, and community recognition.",
            ]),
            div({ class: page.ctaActions() }, [
              h(
                "a",
                {
                  href: becomeSponsorUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  class: btn.primary(),
                },
                "Become a sponsor",
              ),
              h(
                "a",
                {
                  href: "mailto:sponsors@echojs.dev",
                  class: btn.secondary(),
                },
                "Contact us",
              ),
            ]),
          ]),
          HomeFooter(),
        ]),
      ]),
    ]),
  "SponsorsView",
);
