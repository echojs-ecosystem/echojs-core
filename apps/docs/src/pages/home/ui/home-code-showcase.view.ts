import { createView, type Child } from "@echojs/hyperdom";
import { button, div, h2, li, p, span, ul } from "@echojs/hyperdom";
import { codeTabs } from "@pages/home/constants/home.constants.js";
import type { HomeVM } from "@pages/home/types/home.types.js";
import { homeStyles } from "@shared/styles/home.js";
import { cn } from "@shared/styles/cn.js";
import { CodeBlock } from "@widgets/code-block/index.js";

const home = homeStyles();

const codeDots = (home: ReturnType<typeof homeStyles>) => [
  span({ class: [home.codeDot(), home.codeDotRed()].join(" ") }),
  span({ class: [home.codeDot(), home.codeDotYellow()].join(" ") }),
  span({ class: [home.codeDot(), home.codeDotGreen()].join(" ") }),
];

export const HomeCodeShowcaseView = createView((vm: HomeVM): Child => {
  return div({ class: home.codeShowcase() }, [
    div({ class: home.codeShowcaseGlow() }),
    div({ class: home.codeShowcaseGrid() }, [
      div(null, [
        p({ class: home.sectionEyebrow() }, "Layers"),
        div({ class: home.codeTabRail() }, [
          ...codeTabs.map((tab, index) =>
            button(
              {
                type: "button",
                class: () =>
                  cn(
                    home.codeTabBtn(),
                    vm.isCodeTabActive(index) && home.codeTabBtnActive(),
                  ),
                onClick: () => vm.setCodeTab(index),
              },
              [
                span({ class: home.codeTabIcon() }, tab.icon),
                span({ class: home.codeTabLayer() }, tab.layer),
                span({ class: home.codeTabLabel() }, tab.label),
              ],
            ),
          ),
        ]),
        div({ class: home.codeDetail() }, [
          (): Child => {
            const tab = vm.activeCodeTab();
            return [
              h2({ class: home.codeDetailTitle() }, tab.title),
              p({ class: home.codeDetailBody() }, tab.body),
              ul({ class: home.codeDetailList() }, [
                ...tab.points.map((point) =>
                  li({ class: home.codeDetailItem() }, [
                    span({ class: home.codeDetailBullet() }, "✓"),
                    point,
                  ]),
                ),
              ]),
            ];
          },
        ]),
      ]),
      div({ class: home.codeEditor() }, [
        (): Child => {
          const tab = vm.activeCodeTab();
          return [
            div({ class: home.codeEditorChrome() }, [
              div({ class: home.codeEditorDots() }, codeDots(home)),
              span({ class: home.codeEditorTitle() }, `src/${tab.label}`),
              span({ class: home.codeEditorBadge() }, "TypeScript"),
            ]),
            div({ class: home.codeEditorBody() }, [
              CodeBlock({ language: tab.lang, code: tab.code, bare: true }),
            ]),
            p({ class: home.codeEditorFoot() }, () => `${tab.layer} · ${tab.points[0] ?? ""}`),
          ];
        },
      ]),
    ]),
    div({ class: "mt-4 lg:hidden" }, [
      (): Child => {
        const tab = vm.activeCodeTab();
        return [
          h2({ class: home.codeDetailTitle() }, tab.title),
          p({ class: home.codeDetailBody() }, tab.body),
          ul({ class: home.codeDetailList() }, [
            ...tab.points.map((point) =>
              li({ class: home.codeDetailItem() }, [
                span({ class: home.codeDetailBullet() }, "✓"),
                point,
              ]),
            ),
          ]),
        ];
      },
    ]),
  ]);
}, "HomeCodeShowcaseView");
