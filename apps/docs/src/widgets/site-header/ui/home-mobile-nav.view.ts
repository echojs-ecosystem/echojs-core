import type { Child } from "@echojs-ecosystem/framework/hyperdom";
import { aside, button, div, nav as navEl, p, Show } from "@echojs-ecosystem/framework/hyperdom";
import { NavLink } from "@echojs-ecosystem/framework/router";
import { docPageByContentId } from "@app/router/doc-pages.js";
import { homePage } from "@app/router/page-links.js";
import { siteHeaderNavItems } from "@widgets/site-header/model/site-header.model.js";
import { $homeNavOpen, closeHomeNav } from "@widgets/site-header/model/home-mobile-nav.js";
import { homeMobileNavStyles } from "@widgets/site-header/ui/home-mobile-nav.view.styles.js";
const styles = homeMobileNavStyles();

const closeOnLinkClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement | null;
  if (target?.closest("a")) closeHomeNav();
};

export const HomeMobileNav = (): Child =>
  Show(
    () => $homeNavOpen.value(),
    () => [
      div({
        class: styles.overlay(),
        onClick: closeHomeNav,
      }),
      aside({ class: styles.panel() }, [
        div({ class: styles.header() }, [
          p({ class: styles.title() }, "Navigation"),
          button(
            {
              type: "button",
              class: styles.closeBtn(),
              onClick: closeHomeNav,
              "aria-label": "Close navigation",
            },
            "Close",
          ),
        ]),
        navEl({ class: styles.links(), onClick: closeOnLinkClick }, [
          NavLink({
            to: homePage,
            class: styles.link(),
            children: "Home",
          }),
          ...siteHeaderNavItems.map((item) =>
            NavLink({
              to: docPageByContentId[item.contentId]!,
              class: styles.link(),
              children: item.label,
            }),
          ),
        ]),
      ]),
    ],
  );
