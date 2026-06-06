import { createView, type Child } from "@echojs-ecosystem/framework/hyperdom";
import { NavLink } from "@echojs-ecosystem/framework/router";
import { div, p, span } from "@echojs-ecosystem/framework/hyperdom";
import { docPageByContentId } from "@app/router/doc-pages.js";
import {
  testingAdvantages,
  testingCodePanels,
} from "@entities/home/constants/testing-advantages.js";
import {
  homeTestingStyles,
  testingDotColors,
} from "@entities/home/ui/home-testing.view.styles.js";
import { cn } from "@core/styles/cn.js";
import { CodeBlock } from "@widgets/code-block/index.js";

const home = homeTestingStyles();

const advantageNumbers = ["01", "02", "03", "04"] as const;

const TestingSplitDiagram = (): Child =>
  div({ class: home.splitDiagram() }, [
    div({ class: home.splitBox() }, [
      p({ class: home.splitLabel() }, "createModel"),
      p({ class: home.splitHint() }, "unit tests · no mount"),
    ]),
    span({ class: home.splitArrow(), "aria-hidden": "true" }, "→"),
    div({ class: home.splitBox() }, [
      p({ class: home.splitLabel() }, "createView"),
      p({ class: home.splitHint() }, "stub VM · optional render"),
    ]),
  ]);

const TestingCodePanels = (): Child =>
  div({ class: home.codeStack() }, [
    div({ class: home.codeStackGlow() }),
    TestingSplitDiagram(),
    ...testingCodePanels.map((panel) =>
      div({ class: home.codePanel() }, [
        div({ class: home.codeChrome() }, [
          div({ class: home.codeDots() }, [
            ...testingDotColors.map((color) => span({ class: cn(home.codeDot(), color) })),
          ]),
          span({ class: home.codeTitle() }, panel.file),
          span({ class: home.codeBadge() }, panel.badge),
        ]),
        div({ class: home.codeBody() }, [
          CodeBlock({ language: panel.lang, code: panel.code, bare: true }),
        ]),
        p({ class: home.codeFoot() }, panel.caption),
      ]),
    ),
  ]);

export const HomeTestingBridgeView = createView(
  (_vm: void): Child =>
    div({ class: home.bridge() }, [
      p({ class: home.bridgeText() }, [
        "EchoJS splits ",
        span({ class: cn("font-medium text-fg") }, "state and behavior"),
        " from ",
        span({ class: cn("font-medium text-fg") }, "markup"),
        " at every layer. That is not ceremony — it is what makes testing straightforward: exercise the model as a plain object, mount the view only when the DOM matters.",
      ]),
      NavLink({
        to: docPageByContentId["architecture/models"]!,
        class: home.bridgeLink(),
        children: ["Models & views", span(null, "→")],
      }),
    ]),
  "HomeTestingBridgeView",
);

export const HomeTestingView = createView(
  (_vm: void): Child =>
    div(null, [
      HomeTestingBridgeView(),
      div({ class: home.grid() }, [
        div({ class: home.advantages() }, [
          ...testingAdvantages.map((item, index) =>
            NavLink({
              to: docPageByContentId[item.docId]!,
              class: home.advantageCard(),
              children: [
                span({ class: home.advantageIcon() }, advantageNumbers[index] ?? "•"),
                p({ class: home.advantageTitle() }, item.title),
                p({ class: home.advantageSummary() }, item.summary),
                p({ class: home.advantageHighlight() }, item.highlight),
                span({ class: home.advantageLink() }, ["Read more", span(null, "→")]),
              ],
            }),
          ),
        ]),
        TestingCodePanels(),
      ]),
    ]),
  "HomeTestingView",
);
