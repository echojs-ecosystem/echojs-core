import { effect, signal } from "@echojs-ecosystem/framework/reactivity";
import { NavLink } from "@echojs-ecosystem/framework/router";
import { appRouter } from "@app/router/router.js";
import type { AnyPage } from "@echojs-ecosystem/framework/router";
import type { Child } from "@echojs-ecosystem/framework/hyperdom";
import { button, div, span } from "@echojs-ecosystem/framework/hyperdom";
import {
  isPackageNavSubsection,
  packageIdFromPathname,
  type PackageNavChild,
  type PackageNavGroup,
  type PackageNavSubsection,
} from "@core/content/package-nav.js";
import type { ContentId, DocsNavItem } from "@core/content/types.js";
import type { NavIconId } from "@core/content/nav-icon-id.js";
import { resolveNavIcon, resolvePackageGroupIcon } from "@core/content/resolve-nav-icon.js";
import { docPageByContentId } from "@app/router/doc-pages.js";
import { navLinkStyles, shellStyles } from "@widgets/docs-shell/docs-shell.styles.js";
import { cn } from "@core/styles/cn.js";
import { NavIcon } from "@widgets/icons/nav-icons.js";

const shell = shellStyles();

const subsectionIcons: Record<string, NavIconId> = {
  guides: "book",
  api: "api",
  examples: "code",
};

const NavChevron = (isOpen: () => boolean, nested = false): Child =>
  span(
    {
      class: () =>
        cn(
          nested ? shell.packageSubsectionChevronWrap() : shell.packageChevronWrap(),
          isOpen() &&
            (nested ? shell.packageSubsectionChevronOpen() : shell.packageChevronOpen()),
        ),
    },
    [
      NavIcon(
        "chevron-right",
        nested ? shell.packageSubsectionChevronIcon() : shell.packageChevronIcon(),
      ),
    ],
  );

/** One align effect per package group — view factory runs on every sidebar render. */
const packageGroupPathEffects = new Set<string>();

const pathnameToContentId = (pathname: string): ContentId | null => {
  const match = pathname.match(/^\/docs\/(.+)$/);
  return match?.[1] ?? null;
};

const readExpanded = (groupId: string): boolean => {
  if (typeof window === "undefined") return false;
  const active = packageIdFromPathname(window.location.pathname);
  if (active === groupId) return true;
  return window.localStorage.getItem(`docs:pkg:${groupId}`) === "open";
};

const persistExpanded = (groupId: string, open: boolean): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`docs:pkg:${groupId}`, open ? "open" : "closed");
};

const readSubsectionExpanded = (groupId: string, subsection: PackageNavSubsection): boolean => {
  if (typeof window === "undefined") return false;
  const contentId = pathnameToContentId(window.location.pathname);
  if (contentId && subsection.children.some((child) => child.contentId === contentId)) return true;
  return window.localStorage.getItem(`docs:pkg:${groupId}:${subsection.id}`) === "open";
};

const persistSubsectionExpanded = (groupId: string, subsectionId: string, open: boolean): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`docs:pkg:${groupId}:${subsectionId}`, open ? "open" : "closed");
};

const childLink = (
  page: AnyPage,
  label: string,
  contentId: string,
  slug: string,
  nested = false,
  onNavigate?: () => void,
): Child =>
  div(
    {
      class: shell.packageChildWrap(),
      onmousedown: onNavigate,
    },
    [
      NavLink({
        to: page,
        activeClass: navLinkStyles({ active: true, withIcon: true }),
        class: [
          navLinkStyles({ withIcon: true }),
          shell.packageChildLink(),
          nested ? shell.packageChildNested() : "",
        ].join(" "),
        children: [
          NavIcon(resolveNavIcon(contentId, slug), shell.packageChildIcon()),
          span({ class: "min-w-0 truncate" }, label),
        ],
      }),
    ],
  );

const PackageNavSubsectionView = (
  groupId: string,
  subsection: PackageNavSubsection,
  ensureGroupOpen: () => void,
): Child => {
  const $open = signal(readSubsectionExpanded(groupId, subsection));

  const setOpen = (open: boolean): void => {
    $open.set(open);
    persistSubsectionExpanded(groupId, subsection.id, open);
  };

  const toggle = (): void => setOpen(!$open.value());

  const syncOpenForActivePage = (): void => {
    const contentId = pathnameToContentId(appRouter.$path.value());
    if (contentId && subsection.children.some((child) => child.contentId === contentId)) {
      setOpen(true);
      ensureGroupOpen();
    }
  };

  syncOpenForActivePage();

  effect(() => {
    appRouter.$path.value();
    syncOpenForActivePage();
  });

  const renderLeaf = (child: DocsNavItem): Child =>
    childLink(
      docPageByContentId[child.contentId]!,
      child.title,
      child.contentId,
      child.slug,
      true,
      ensureGroupOpen,
    );

  return div({ class: shell.packageSubsection() }, [
    button(
      {
        type: "button",
        class: () =>
          cn(
            shell.packageSubsectionBtn(),
            "group",
            $open.value() && shell.packageSubsectionBtnOpen(),
          ),
        onClick: toggle,
      },
      [
        NavChevron(() => $open.value(), true),
        NavIcon(subsectionIcons[subsection.id] ?? "file-text", shell.packageSubsectionIcon()),
        span({ class: shell.packageSubsectionLabel() }, subsection.title),
      ],
    ),
    () =>
      $open.value()
        ? div({ class: shell.packageSubsectionChildren() }, subsection.children.map(renderLeaf))
        : null,
  ]);
};

export type PackageNavGroupViewOptions = {
  featured?: boolean;
};

export const PackageNavGroupView = (
  group: PackageNavGroup,
  options: PackageNavGroupViewOptions = {},
): Child => {
  const featured = options.featured ?? group.featured ?? false;
  const $open = signal(readExpanded(group.id));

  const setOpen = (open: boolean): void => {
    $open.set(open);
    persistExpanded(group.id, open);
  };

  const toggle = (): void => setOpen(!$open.value());
  const ensureGroupOpen = (): void => setOpen(true);

  const syncOpenForActivePackage = (): void => {
    const active = packageIdFromPathname(appRouter.$path.value());
    if (active === group.id) setOpen(true);
  };

  syncOpenForActivePackage();

  if (!packageGroupPathEffects.has(group.id)) {
    packageGroupPathEffects.add(group.id);
    effect(() => {
      appRouter.$path.value();
      syncOpenForActivePackage();
    });
  }

  const renderChild = (child: PackageNavChild): Child => {
    if (isPackageNavSubsection(child)) {
      return PackageNavSubsectionView(group.id, child, ensureGroupOpen);
    }
    return childLink(
      docPageByContentId[child.contentId]!,
      child.title,
      child.contentId,
      child.slug,
      false,
      ensureGroupOpen,
    );
  };

  const groupIcon = resolvePackageGroupIcon(group.id);

  return div({ class: cn(shell.packageGroup(), featured && shell.packageGroupFeatured()) }, [
    button(
      {
        type: "button",
        class: () => {
          const activePkg = typeof window !== "undefined" ? packageIdFromPathname(window.location.pathname) : null;
          return cn(
            shell.packageGroupBtn(),
            "group",
            featured && shell.packageGroupBtnFeatured(),
            ($open.value() || activePkg === group.id) &&
              (featured ? shell.packageGroupBtnFeaturedActive() : shell.packageGroupBtnActive()),
          );
        },
        onClick: toggle,
      },
      [
        NavIcon(
          groupIcon,
          cn(shell.packageGroupIcon(), featured && shell.packageGroupIconFeatured()),
        ),
        NavChevron(() => $open.value()),
        span({ class: shell.packageGroupLabel() }, [
          span({ class: cn(shell.packageGroupName(), featured && shell.packageGroupNameFeatured()) }, [
            group.title,
            featured
              ? span({ class: shell.packageGroupBadge() }, "Start here")
              : null,
          ]),
        ]),
      ],
    ),
    () =>
      $open.value()
        ? div({ class: shell.packageChildren() }, group.children.map(renderChild))
        : null,
  ]);
};
