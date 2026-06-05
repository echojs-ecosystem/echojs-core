import { createView, type Child } from "@echojs-ecosystem/framework/hyperdom";
import { NavLink } from "@echojs-ecosystem/framework/router";
import { div, h1, h2, main, p, section, span } from "@echojs-ecosystem/framework/hyperdom";
import { docPageByContentId } from "@app/router/doc-pages.js";
import type { HomeVM } from "@entities/home/types/home.types.js";
import { HomeCodeShowcaseView } from "@entities/home/ui/home-code-showcase.view.js";
import { HomeCtaView } from "@entities/home/ui/home-cta.view.js";
import { HomeHeroCodeWindowView } from "@entities/home/ui/home-hero-code-window.view.js";
import { HomeArchitectureView } from "@entities/home/ui/home-architecture.view.js";
import {
  HomePhilosophyBridgeView,
  HomePhilosophyPrinciplesView,
} from "@entities/home/ui/home-philosophy-principles.view.js";
import { heroPills, homeStats } from "@entities/home/constants/home-landing.data.js";
import { ecosystemPackages } from "@widgets/ecosystem/constants/ecosystem-packages.js";
import { homeButtonStyles } from "@entities/home/ui/home-button.styles.js";
import { HomeFrameworkStrengthView } from "@entities/home/ui/home-framework-strength.view.js";
import { homeStyles } from "@entities/home/ui/home.view.styles.js";
import { EcosystemPackageCard } from "@widgets/ecosystem/index.js";
import { FrameworkComparisonSection } from "@widgets/framework-comparison/index.js";
import { HomeFooter } from "@widgets/home-shell/index.js";
import { HomeHeader } from "@widgets/home-shell/home-header.js";
import { PackageInstall } from "@widgets/package-install/index.js";
import { SponsorsSection } from "@widgets/sponsors/index.js";

const home = homeStyles();
const btn = homeButtonStyles();

export const HomeView = createView((vm: HomeVM): Child => {
  return div({ class: home.root() }, [
    div({ class: home.mesh() }),
    div({ class: home.glow() }),

    HomeHeader(),

    main({ class: home.main() }, [
      div({ class: home.container() }, [
        section({ class: home.hero() }, [
          div({ class: home.heroGrid() }, [
            div({ class: home.heroContent() }, [
              p({ class: home.heroBadge() }, [
                span({ class: home.heroBadgeDot() }),
                "Signal-first · Official docs",
              ]),
              h1({ class: home.heroTitle() }, [
                "Build faster with ",
                span({ class: home.heroTitleAccent() }, "EchoJS"),
              ]),
              p({ class: home.heroSubtitle() }, [
                "A modern framework for scalable web apps — fine-grained signals, zero virtual DOM, and a composable ecosystem.",
              ]),
              div({ class: home.heroPills() }, [
                ...heroPills.map((pill) => span({ class: home.heroPill() }, pill)),
              ]),
              div({ class: home.heroActions() }, [
                NavLink({
                  to: docPageByContentId["getting-started/installation"]!,
                  class: btn.primary(),
                  children: "Get Started",
                }),
                NavLink({
                  to: docPageByContentId["introduction/what-is-echojs"]!,
                  class: btn.secondary(),
                  children: "What is EchoJS?",
                }),
              ]),
              div({ class: home.heroStats() }, [
                ...homeStats.map((stat) =>
                  div(null, [
                    p({ class: home.heroStatValue() }, stat.value),
                    p({ class: home.heroStatLabel() }, stat.label),
                  ]),
                ),
              ]),
            ]),
            div({ class: home.heroVisual() }, [
              div({ class: home.heroVisualStack() }, [
                HomeHeroCodeWindowView(),
                PackageInstall(),
              ]),
            ]),
          ]),
        ]),

        section({ class: home.section() }, [
          div({ class: home.sectionInner() }, [
            div({ class: home.sectionHeader() }, [
              p({ class: home.sectionEyebrow() }, "Philosophy"),
              h2({ class: home.sectionTitle() }, "Reactive by design, not by accident"),
              p({ class: home.sectionLead() }, [
                "EchoJS updates the DOM surgically — then encodes that mindset in folder structure, providers, and typed routes so teams do not reinvent conventions per repo.",
              ]),
            ]),
            HomePhilosophyBridgeView(),
            HomePhilosophyPrinciplesView(),
          ]),
        ]),

        section({ class: home.section() }, [
          div({ class: home.sectionInner() }, [
            div({ class: home.sectionHeader() }, [
              p({ class: home.sectionEyebrow() }, "Architecture"),
              h2({ class: home.sectionTitle() }, "Structure that scales with your team"),
              p({ class: home.sectionLead() }, [
                "EchoJS is not only fast at runtime — it replaces ad-hoc folders with six predictable layers, feature-first slices, and enforceable import rules.",
              ]),
            ]),
            HomeArchitectureView(),
          ]),
        ]),

        section({ class: home.section() }, [
          div({ class: home.sectionInner() }, [
            div({ class: home.sectionHeader() }, [
              p({ class: home.sectionEyebrow() }, "Ecosystem"),
              h2({ class: home.sectionTitle() }, "One framework, many packages"),
              p({ class: home.sectionLead() }, [
                "Adopt incrementally — each package solves one problem and plugs in through providers.",
              ]),
            ]),
            div({ class: home.ecosystemGrid() }, [
              ...ecosystemPackages.map((pkg) => EcosystemPackageCard(pkg)),
            ]),
          ]),
        ]),

        section({ class: home.section() }, [
          div({ class: home.sectionInner() }, [
            div({ class: home.sectionHeader() }, [
              p({ class: home.sectionEyebrow() }, "Compare"),
              h2({ class: home.sectionTitle() }, "EchoJS vs the mainstream"),
              p({ class: home.sectionLead() }, [
                "React, Vue, Angular, Solid, and Svelte each made different bets. See the matrix below — then read ",
                NavLink({
                  to: docPageByContentId["comparisons/react"]!,
                  class: home.archLink(),
                  children: [
                    "EchoJS vs React + ecosystem",
                    span({ class: home.archLinkArrow() }, "→"),
                  ],
                }),
                " for architecture and state depth.",
              ]),
            ]),
            FrameworkComparisonSection(),
          ]),
        ]),

        section({ class: home.section() }, [
          div({ class: home.sectionInner() }, [
            div({ class: home.archGrid() }, [
              div({ class: home.archContent() }, [
                p({ class: home.sectionEyebrow() }, "Runtime"),
                h2({ class: home.archTitle() }, "Surgical updates, not tree diffs"),
                p({ class: home.archBody() }, [
                  "Signals track exactly what your UI depends on. HyperDOM updates only the nodes that changed — no virtual tree, no reconciliation pass, predictable cost as apps grow.",
                ]),
                NavLink({
                  to: docPageByContentId["packages/reactivity"]!,
                  class: home.archLink(),
                  children: [
                    "Explore signals & HyperDOM",
                    span({ class: home.archLinkArrow() }, "→"),
                  ],
                }),
              ]),
              HomeFrameworkStrengthView(),
            ]),
          ]),
        ]),

        section({ class: home.section() }, [
          div({ class: home.sectionInner() }, [
            div({ class: home.sectionHeader() }, [
              p({ class: home.sectionEyebrow() }, "Developer experience"),
              h2({ class: home.sectionTitle() }, "Code-first DX"),
              p({ class: home.sectionLead() }, [
                "Real snippets from how EchoJS apps are wired — pick a layer on the left, read the idea, inspect TypeScript on the right.",
              ]),
            ]),
            HomeCodeShowcaseView(vm),
          ]),
        ]),

        section({ class: "relative pt-4" }, [
          div({ class: home.sectionInner() }, [HomeCtaView()]),
        ]),

        SponsorsSection(),
        HomeFooter(),
      ]),
    ]),
  ]);
}, "HomeView");
