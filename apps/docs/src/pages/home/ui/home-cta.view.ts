import { createView, type Child } from "@echojs/hyperdom";
import { NavLink } from "@echojs/router/hyperdom";
import { div, h2, p, span } from "@echojs/hyperdom";
import { docPageByContentId } from "@entities/__routes__/doc-pages.js";
import { homeButtonStyles, homeStyles } from "@shared/styles/home.js";
import { PackageInstall } from "@widgets/package-install/index.js";

const home = homeStyles();
const btn = homeButtonStyles();

const ctaSteps = [
  { n: "1", label: "Install" },
  { n: "2", label: "Bootstrap" },
  { n: "3", label: "Ship a route" },
] as const;

export const HomeCtaView = createView(
  (_vm: void): Child =>
    div({ class: home.cta() }, [
      div({ class: home.ctaMesh() }),
      div({ class: home.ctaGrid() }, [
        div({ class: home.ctaCopy() }, [
          p({ class: home.ctaEyebrow() }, "Next step"),
          h2({ class: home.ctaTitle() }, "Ready to build with EchoJS?"),
          p({ class: home.ctaBody() }, [
            "Scaffold a project, wire providers once, and open your first typed route — the same flow as ",
            span({ class: home.ctaBodyEm() }, "apps/docs"),
            " and ",
            span({ class: home.ctaBodyEm() }, "apps/example"),
            ".",
          ]),
          div({ class: home.ctaSteps() }, [
            ...ctaSteps.map((step) =>
              div({ class: home.ctaStep() }, [
                span({ class: home.ctaStepNum() }, step.n),
                span(null, step.label),
              ]),
            ),
          ]),
          div({ class: home.ctaActions() }, [
            NavLink({
              to: docPageByContentId["getting-started/first-application"]!,
              class: btn.primary(),
              children: "Start building",
            }),
            NavLink({
              to: docPageByContentId["introduction/what-is-echojs"]!,
              class: btn.secondary(),
              children: "What is EchoJS?",
            }),
          ]),
        ]),
        div({ class: home.ctaAside() }, [
          p({ class: home.ctaAsideLabel() }, "Quick start"),
          p({ class: home.ctaAsideHint() }, "Pick your package manager — command copies on click."),
          div({ class: home.ctaInstall() }, [PackageInstall()]),
        ]),
      ]),
    ]),
  "HomeCtaView",
);
