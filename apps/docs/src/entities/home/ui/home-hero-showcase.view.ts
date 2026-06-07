import { createView, type Child } from "@echojs-ecosystem/framework/hyperdom";
import { button, div, span } from "@echojs-ecosystem/framework/hyperdom";
import { heroTabs } from "@entities/home/constants/home.constants.js";
import { codeDots } from "@entities/home/helpers/code-dots.js";
import type { HeroTabCode, HomeVM } from "@entities/home/types/home.types.js";
import { homeHeroShowcaseStyles } from "@entities/home/ui/home-hero-showcase.view.styles.js";
import { cn } from "@core/styles/cn.js";
import { CodeBlock } from "@widgets/code-block/index.js";
import { HighlightedCommand } from "@widgets/package-install/highlighted-command.js";
import { PackageManagerIcon } from "@widgets/package-install/pm-icons.js";

const home = homeHeroShowcaseStyles();

const HeroCodePanel = (tab: HeroTabCode): Child =>
  div({ class: home.content() }, [
    div({ class: home.codeChrome() }, [
      ...codeDots(),
      span({ class: home.codeTitle() }, tab.file),
      span({ class: home.codeBadge() }, "TypeScript"),
    ]),
    div({ class: home.codeBody() }, [
      CodeBlock({ language: tab.lang, code: tab.code, bare: true }),
    ]),
  ]);

const HeroTerminalPanel = (vm: HomeVM): Child =>
  div({ class: home.content() }, [
    div(
      {
        class: home.terminalBody(),
        role: "button",
        tabIndex: 0,
        onClick: () => void vm.copyScaffoldCommand(),
        onKeydown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            void vm.copyScaffoldCommand();
          }
        },
        "aria-label": "Copy install command",
      },
      [
        span(
          {
            class: () =>
              cn(
                home.copyHint(),
                vm.scaffoldCopyHint() === "Copied" && home.copyHintVisible(),
              ),
          },
          vm.scaffoldCopyHint,
        ),
        () => HighlightedCommand([...vm.activeScaffoldTokens()]),
      ],
    ),
  ]);

export const HomeHeroShowcaseView = createView((vm: HomeVM): Child => {
  return div({ class: home.panel() }, [
    div({ class: home.mainTabs() }, [
      ...heroTabs.map((tab, index) =>
        button(
          {
            type: "button",
            class: () =>
              cn(home.mainTab(), vm.isHeroTabActive(index) && home.mainTabActive()),
            onClick: () => vm.setHeroTab(index),
          },
          tab.label,
        ),
      ),
    ]),
    div(
      {
        class: () =>
          cn(
            home.subTabs(),
            vm.activeHeroTab().kind !== "terminal" && home.subTabsHidden(),
          ),
      },
      vm.scaffoldManagers.map((pm) =>
        button(
          {
            type: "button",
            class: () =>
              cn(home.subTab(), vm.isScaffoldManagerActive(pm.id) && home.subTabActive()),
            onClick: () => vm.setScaffoldManager(pm.id),
            "aria-label": `Show install command for ${pm.label}`,
          },
          [span({ class: home.subTabIcon() }, [PackageManagerIcon(pm.id)]), pm.label],
        ),
      ),
    ),
    () => {
      const tab = vm.activeHeroTab();
      if (tab.kind === "terminal") return HeroTerminalPanel(vm);
      return HeroCodePanel(tab);
    },
  ]);
}, "HomeHeroShowcaseView");
