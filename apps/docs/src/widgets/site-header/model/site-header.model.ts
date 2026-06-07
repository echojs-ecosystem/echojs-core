import { createModel } from "@echojs-ecosystem/framework/hyperdom";
import type { Signal } from "@echojs-ecosystem/framework/reactivity";
import { $docsHeaderScrolled } from "@app/docs-header-scroll.js";
import { buildSiteHeaderNavItems, type SiteHeaderNavItem } from "@app/router/header-nav.js";
import { toggleMobileNav } from "@widgets/docs-shell/model/mobile-nav.js";
import { toggleHomeNav } from "@widgets/site-header/model/home-mobile-nav.js";
import { homeHeaderStyles } from "@widgets/site-header/ui/site-header.view.styles.js";

export type { SiteHeaderNavItem } from "@app/router/header-nav.js";

export type SiteHeaderMode = "home" | "docs";

export type SiteHeaderOptions = {
  mode?: SiteHeaderMode;
};

export type SiteHeaderVM = {
  mode: SiteHeaderMode;
  $scrolled: Signal<boolean>;
  headerStyles: () => ReturnType<typeof homeHeaderStyles>;
  navItems: SiteHeaderNavItem[];
  showMenu: boolean;
  openMobileNav: () => void;
};

export const createSiteHeaderModel = (options: SiteHeaderOptions = {}) =>
  createModel((): SiteHeaderVM => {
    const mode = options.mode ?? "home";

    return {
      mode,
      $scrolled: $docsHeaderScrolled,
      headerStyles: () =>
        homeHeaderStyles({
          layout: mode,
          scrolled: $docsHeaderScrolled.value(),
        }),
      navItems: buildSiteHeaderNavItems(),
      showMenu: true,
      openMobileNav: mode === "docs" ? toggleMobileNav : toggleHomeNav,
    };
  }, "SiteHeaderModel");
