import { createView, type Child } from "@echojs/hyperdom";
import { div, li, p, span, ul } from "@echojs/hyperdom";
import type { CompareCardViewProps } from "@pages/home/types/home.types.js";
import { compareCardStyles } from "@shared/styles/home.js";

export const HomeCompareCardView = createView((props: CompareCardViewProps): Child => {
  const card = compareCardStyles({ tone: props.tone });

  return div({ class: card.root() }, [
    p({ class: card.title() }, props.data.title),
    ul({ class: card.list() }, [
      ...props.data.items.map((item) =>
        li({ class: card.item() }, [span({ class: card.bullet() }), span(null, item)]),
      ),
    ]),
  ]);
}, "HomeCompareCardView");
