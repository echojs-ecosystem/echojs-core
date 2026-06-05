import { createView, type Child } from "@echojs/hyperdom";
import { NavLink } from "@echojs/router/hyperdom";
import { div, h1, h2, main, p, section, span } from "@echojs/hyperdom";
import { docPageByContentId } from "@entities/__routes__/doc-pages.js";
import {
  architectureLayers,
  ecosystemPackages,
  heroPills,
  homeStats,
} from "@shared/home/ecosystem-packages.js";
import {
  archLayerStyles,
  homeButtonStyles,
  homeStyles,
} from "@shared/styles/home.js";
import { EcosystemPackageCard } from "@widgets/ecosystem/index.js";
import { FrameworkComparisonSection } from "@widgets/framework-comparison/index.js";
import { HomeFooter } from "@widgets/home-shell/index.js";
import { HomeHeader } from "@widgets/home-shell/home-header.js";
import { PackageInstall } from "@widgets/package-install/index.js";
import { SponsorsSection } from "@widgets/sponsors/index.js";
import type { HomeVM } from "@pages/home/types/home.types.js";
import { HomeCodeShowcaseView } from "@pages/home/ui/home-code-showcase.view.js";
import {
  HomePhilosophyBridgeView,
  HomePhilosophyPrinciplesView,
} from "@pages/home/ui/home-philosophy-principles.view.js";
import { HomeCtaView } from "@pages/home/ui/home-cta.view.js";
import { HomeHeroCodeWindowView } from "@pages/home/ui/home-hero-code-window.view.js";

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
                p({ class: home.sectionEyebrow() }, "Architecture"),
                h2({ class: home.archTitle() }, "Layers that scale with your team"),
                p({ class: home.archBody() }, [
                  "EchoJS promotes feature-first structure with explicit dependency flow — from app shell down to shared utilities.",
                ]),
                NavLink({
                  to: docPageByContentId["architecture/feature-first"]!,
                  class: home.archLink(),
                  children: [
                    "Explore feature-first design",
                    span({ class: home.archLinkArrow() }, "→"),
                  ],
                }),
              ]),
              div({ class: home.archDiagram() }, [
                div({ class: home.archDiagramGlow() }),
                div({ class: home.archDiagramInner() }, [
                  ...architectureLayers.flatMap((layer, i) => {
                    const layerStyles = archLayerStyles({
                      emphasis: layer.name === "Shared" ? "foundation" : "default",
                    });
                    const nodes: Child[] = [
                      div({ class: [layerStyles.wrap(), layer.width].join(" ") }, [
                        div({ class: layerStyles.layer() }, [
                          p({ class: layerStyles.name() }, layer.name),
                          p({ class: layerStyles.hint() }, layer.hint),
                        ]),
                      ]),
                    ];
                    if (i < architectureLayers.length - 1) {
                      nodes.push(div({ class: home.archConnector() }));
                    }
                    return nodes;
                  }),
                ]),
              ]),
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
