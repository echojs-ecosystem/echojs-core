import { createView, type Child } from "@echojs/hyperdom";
import { NavLink } from "@echojs/router/hyperdom";
import { div, p, span } from "@echojs/hyperdom";
import { docPageByContentId } from "@app/router/doc-pages.js";
import { philosophyPrinciples } from "@entities/home/constants/philosophy-principles.js";
import {
  homePhilosophyStyles,
  philosophyCardStyles,
} from "@entities/home/ui/home-philosophy-principles.view.styles.js";
import { cn } from "@core/styles/cn.js";

const home = homePhilosophyStyles();
const cardTones = ["honey", "wheat", "sand"] as const;

export const HomePhilosophyPrinciplesView = createView(
  (_vm: void): Child =>
    div({ class: home.philosophyGrid() }, [
      ...philosophyPrinciples.map((principle, index) =>
        NavLink({
          to: docPageByContentId[principle.docId]!,
          class: philosophyCardStyles({ tone: cardTones[index % cardTones.length] }),
          children: [
            div({ class: home.philosophyCardGlow() }),
            span({ class: home.philosophyCardNumber() }, principle.number),
            p({ class: home.philosophyCardTitle() }, principle.title),
            p({ class: home.philosophyCardSummary() }, principle.summary),
            p({ class: home.philosophyCardExample() }, principle.example),
            span({ class: home.philosophyCardLink() }, ["Learn more", span(null, "→")]),
          ],
        }),
      ),
    ]),
  "HomePhilosophyPrinciplesView",
);

export const HomePhilosophyBridgeView = createView(
  (_vm: void): Child =>
    div({ class: home.philosophyBridge() }, [
      p({ class: home.philosophyBridgeText() }, [
        "EchoJS is opinionated on ",
        span({ class: cn("font-medium text-fg") }, "structure"),
        " and ",
        span({ class: cn("font-medium text-fg") }, "reactivity"),
        " — flexible on product features. Six ideas below shape every package and how we build the docs site itself.",
      ]),
      NavLink({
        to: docPageByContentId["introduction/philosophy"]!,
        class: home.philosophyBridgeLink(),
        children: ["Full philosophy", span(null, "→")],
      }),
    ]),
  "HomePhilosophyBridgeView",
);
