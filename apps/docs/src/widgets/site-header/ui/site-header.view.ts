import { createView, type Child } from "@echojs/hyperdom";
import { NavLink } from "@echojs/router/hyperdom";
import { button, div, h, header, nav as navEl, p } from "@echojs/hyperdom";
import { docPageByContentId } from "@app/router/doc-pages.js";
import { homePage } from "@app/router/page-links.js";
import { headerIconBtnStyles } from "@widgets/site-header/ui/site-header.view.styles.js";
import { GitHubIcon } from "@widgets/icons/github-icon.js";
import { DocsSearch } from "@widgets/search/index.js";
import { LocaleDropdown } from "@widgets/locale-dropdown/index.js";
import { ThemeToggle } from "@widgets/theme-toggle/index.js";
import { VersionDropdown } from "@widgets/version-dropdown/index.js";
import type { SiteHeaderVM } from "@widgets/site-header/model/site-header.model.js";

export const SiteHeaderView = createView((vm: SiteHeaderVM): Child => {
  const hdr = () => vm.headerStyles();

  return header({ class: () => hdr().root() }, [
    div({ class: () => hdr().inner() }, [
      vm.showMenu
        ? button(
            {
              type: "button",
              class: hdr().menuBtn(),
              onclick: vm.openMobileNav,
              "aria-label": "Open navigation",
            },
            "Menu",
          )
        : null,
      NavLink({
        to: homePage,
        class: hdr().brand(),
        children: [
          div({ class: hdr().logo() }, "◉"),
          div(null, [
            p({ class: hdr().brandName() }, "EchoJS"),
            p({ class: hdr().brandTag() }, "Documentation"),
          ]),
        ],
      }),
      navEl({ class: hdr().nav() }, [
        NavLink({
          to: homePage,
          class: hdr().navLink(),
          children: "Home",
        }),
        ...vm.navItems.map((item) =>
          NavLink({
            to: docPageByContentId[item.contentId]!,
            class: hdr().navLink(),
            children: item.label,
          }),
        ),
      ]),
      div({ class: hdr().searchWrap() }, [DocsSearch()]),
      div({ class: hdr().actions() }, [
        VersionDropdown(),
        LocaleDropdown(),
        h(
          "a",
          {
            href: "https://github.com/echojs/echojs",
            target: "_blank",
            rel: "noopener noreferrer",
            class: [hdr().githubBtn(), headerIconBtnStyles()].join(" "),
            "aria-label": "EchoJS on GitHub",
          },
          [GitHubIcon()],
        ),
        ThemeToggle(),
      ]),
    ]),
  ]);
}, "SiteHeaderView");
