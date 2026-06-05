import type { AnyPage } from "@echojs-ecosystem/router";
import type { NavIconId } from "@core/content/nav-icon-id.js";
import { docPageByContentId } from "@app/router/doc-pages.js";
import { sponsorsPage } from "@app/router/page-links.js";

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
