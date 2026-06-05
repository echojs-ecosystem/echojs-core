import type { AnyPage } from "@echojs/router";
import type { NavIconId } from "@widgets/icons/nav-icon-id.js";
import { docPageByContentId } from "@entities/__routes__/doc-pages.js";
import { homePage } from "@pages/home/home.page.js";
import { sponsorsPage } from "@pages/sponsors/sponsors.page.js";

export type SidebarDocLink = {
  kind: "doc";
  id: string;
  label: string;
  icon: NavIconId;
  page: AnyPage;
};

export type SidebarExternalLink = {
  kind: "external";
  id: string;
  label: string;
  icon: NavIconId;
  href: string;
};

export type SidebarPageLink = {
  kind: "page";
  id: string;
  label: string;
  icon: NavIconId;
  page: AnyPage;
};

export type SidebarLink = SidebarDocLink | SidebarExternalLink | SidebarPageLink;

/** Quick jump above main doc tree. */
export const sidebarQuickLinks: SidebarPageLink[] = [
  { kind: "page", id: "home", label: "Home", icon: "home", page: homePage },
];

/** Bottom block — community, releases, demos (Hero UI–style). */
export const sidebarResourceLinks: SidebarLink[] = [
  {
    kind: "doc",
    id: "playground",
    label: "Live example",
    icon: "play",
    page: docPageByContentId["examples/todo-app"]!,
  },
  {
    kind: "external",
    id: "roadmap",
    label: "Roadmap",
    icon: "roadmap",
    href: "https://github.com/echojs/echojs/issues?q=sort%3Aupdated-desc+label%3Aroadmap",
  },
  {
    kind: "external",
    id: "blog",
    label: "Blog",
    icon: "newspaper",
    href: "https://github.com/echojs/echojs/discussions/categories/announcements",
  },
  {
    kind: "external",
    id: "changelog",
    label: "Changelog",
    icon: "list",
    href: "https://github.com/echojs/echojs/releases",
  },
  { kind: "page", id: "sponsors", label: "Sponsors", icon: "heart", page: sponsorsPage },
  {
    kind: "external",
    id: "github",
    label: "GitHub",
    icon: "github",
    href: "https://github.com/echojs/echojs",
  },
];
