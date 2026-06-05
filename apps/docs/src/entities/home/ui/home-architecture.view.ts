import { createView, type Child } from "@echojs-ecosystem/framework/hyperdom";
import { NavLink } from "@echojs-ecosystem/framework/router/hyperdom";
import { div, p, span } from "@echojs-ecosystem/framework/hyperdom";
import { docPageByContentId } from "@app/router/doc-pages.js";
import {
  architectureAdvantages,
  architectureLayers,
} from "@entities/home/constants/architecture-advantages.js";
import {
  archLayerStyles,
  homeArchitectureStyles,
} from "@entities/home/ui/home-architecture.view.styles.js";
import { cn } from "@core/styles/cn.js";

const home = homeArchitectureStyles();
const layer = archLayerStyles();

const advantageNumbers = ["01", "02", "03", "04"] as const;

const ArchitectureLayerDiagram = (): Child =>
  div({ class: home.diagram() }, [
    div({ class: home.diagramGlow() }),
    div({ class: home.diagramInner() }, [
      ...architectureLayers.flatMap((item, index) => [
        index > 0 ? div({ class: home.connector() }) : null,
        div({ class: layer.wrap() }, [
          div({ class: layer.layer({ emphasis: item.emphasis }) }, [
            p({ class: layer.name() }, item.name),
            p({ class: layer.hint() }, item.hint),
          ]),
        ]),
      ]),
    ]),
    p({ class: home.diagramCaption() }, "imports only upward ↑"),
  ]);

export const HomeArchitectureBridgeView = createView(
  (_vm: void): Child =>
    div({ class: home.bridge() }, [
      p({ class: home.bridgeText() }, [
        "Most frameworks stop at runtime. EchoJS ships an ",
        span({ class: cn("font-medium text-fg") }, "opinionated layer stack"),
        " — the same structure powers ",
        span({ class: cn("font-medium text-fg") }, "apps/docs"),
        ", ",
        span({ class: cn("font-medium text-fg") }, "apps/example"),
        ", and production apps. Boundaries scale with teams instead of collapsing into a flat components folder.",
      ]),
      NavLink({
        to: docPageByContentId["architecture/overview"]!,
        class: home.bridgeLink(),
        children: ["Architecture overview", span(null, "→")],
      }),
    ]),
  "HomeArchitectureBridgeView",
);

export const HomeArchitectureView = createView(
  (_vm: void): Child =>
    div(null, [
      HomeArchitectureBridgeView(),
      div({ class: home.grid() }, [
        ArchitectureLayerDiagram(),
        div({ class: home.advantages() }, [
          ...architectureAdvantages.map((item, index) =>
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
      ]),
    ]),
  "HomeArchitectureView",
);
