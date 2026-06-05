import { createView, type Child } from "@echojs-ecosystem/framework/hyperdom";
import { NavLink } from "@echojs-ecosystem/framework/router/hyperdom";
import { div, p, span } from "@echojs-ecosystem/framework/hyperdom";
import { docPageByContentId } from "@app/router/doc-pages.js";
import { ecosystemPackageStyles } from "@widgets/ecosystem/ui/ecosystem-package-card.view.styles.js";
import type { EcosystemPackageCardViewProps } from "@widgets/ecosystem/types/ecosystem-package-card.types.js";

const card = ecosystemPackageStyles();

export const EcosystemPackageCardView = createView((props: EcosystemPackageCardViewProps): Child => {
  const { pkg } = props;

  return div({ class: card.root() }, [
    div({ class: card.topLine() }),
    div({ class: card.hoverWash() }),
    div({ class: card.content() }, [
      span({ class: card.icon() }, pkg.icon),
      p({ class: card.name() }, pkg.name),
      p({ class: card.description() }, pkg.description),
      NavLink({
        to: docPageByContentId[pkg.contentId]!,
        class: card.link(),
        children: ["Read docs", span({ class: card.linkArrow() }, "→")],
      }),
    ]),
  ]);
}, "EcosystemPackageCardView");
