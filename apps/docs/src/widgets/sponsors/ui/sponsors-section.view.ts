import { createView, type Child } from "@echojs/hyperdom";
import { NavLink } from "@echojs/router/hyperdom";
import { div, h, h2, p, section, span } from "@echojs/hyperdom";
import { sponsorsPage } from "@app/router/page-links.js";
import { becomeSponsorUrl } from "@widgets/sponsors/constants/sponsors.data.js";
import { sponsorsSectionStyles } from "@widgets/sponsors/ui/sponsors-section.view.styles.js";
import { SponsorsBoard } from "@widgets/sponsors/sponsors-board.js";

const s = sponsorsSectionStyles();

export const SponsorsSectionView = createView(
  (_vm: void): Child =>
    section({ class: s.root(), "aria-labelledby": "sponsors-heading" }, [
      div({ class: s.inner() }, [
        div({ class: s.headerRow() }, [
          div({ class: s.header() }, [
            p({ class: s.eyebrow() }, "Community"),
            h2({ id: "sponsors-heading", class: s.title() }, "Sponsors"),
            p({ class: s.lead() }, [
              "Teams backing EchoJS development — Gold, Silver, and Bronze tiers on the sponsors page.",
            ]),
          ]),
          NavLink({
            to: sponsorsPage,
            class: s.viewAll(),
            children: ["View all sponsors", span(null, "→")],
          }),
        ]),
        SponsorsBoard({ variant: "preview" }),
        div({ class: s.actions() }, [
          h(
            "a",
            {
              href: becomeSponsorUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              class: s.becomeBtn(),
            },
            [span({ class: s.becomeIcon() }, "♥"), "Become a sponsor"],
          ),
        ]),
      ]),
    ]),
  "SponsorsSectionView",
);
