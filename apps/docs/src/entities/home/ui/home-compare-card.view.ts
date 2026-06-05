import { createView, type Child } from "@echojs-ecosystem/framework/hyperdom";
import { div, li, p, span, ul } from "@echojs-ecosystem/framework/hyperdom";
import type { CompareCardViewProps } from "@entities/home/types/home.types.js";
import { compareCardStyles } from "@entities/home/ui/home-compare-card.view.styles.js";

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
