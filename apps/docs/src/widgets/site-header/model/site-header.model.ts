import { createModel } from "@echojs-ecosystem/framework/hyperdom";
import { docPageByContentId } from "@app/router/doc-pages.js";
import type { ContentId } from "@core/content/types.js";
import { toggleMobileNav } from "@widgets/docs-shell/model/mobile-nav.js";
import { toggleHomeNav } from "@widgets/site-header/model/home-mobile-nav.js";
import { homeHeaderStyles } from "@widgets/site-header/ui/site-header.view.styles.js";

export const siteHeaderNavItems = [
  { label: "Introduction", contentId: "introduction/what-is-echojs" as const },
  { label: "Getting Started", contentId: "getting-started/installation" as const },
  { label: "Packages", contentId: "packages/framework" as const },
  { label: "Guides", contentId: "guides/routing" as const },
] as const satisfies ReadonlyArray<{ label: string; contentId: ContentId }>;

export type SiteHeaderMode = "home" | "docs";

export type SiteHeaderOptions = {
  mode?: SiteHeaderMode;
};

export type SiteHeaderVM = {
  mode: SiteHeaderMode;
  headerStyles: () => ReturnType<typeof homeHeaderStyles>;
  navItems: typeof siteHeaderNavItems;
  showMenu: boolean;
  openMobileNav: () => void;
};

export const createSiteHeaderModel = (options: SiteHeaderOptions = {}) =>
  createModel((): SiteHeaderVM => {
    const mode = options.mode ?? "home";

    return {
      mode,
      headerStyles: () =>
        homeHeaderStyles({
          layout: mode,
          /** Docs shell keeps a solid bar; home header stays fully transparent. */
          scrolled: mode === "docs",
        }),
      navItems: siteHeaderNavItems,
      showMenu: true,
      openMobileNav: mode === "docs" ? toggleMobileNav : toggleHomeNav,
    };
  }, "SiteHeaderModel");
