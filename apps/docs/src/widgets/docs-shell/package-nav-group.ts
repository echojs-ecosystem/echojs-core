import { effect, signal } from "@echojs-ecosystem/reactivity";
import { NavLink } from "@echojs-ecosystem/router/hyperdom";
import { appRouter } from "@app/router/router.js";
import type { AnyPage } from "@echojs-ecosystem/router";
import type { Child } from "@echojs-ecosystem/hyperdom";
import { button, div, span } from "@echojs-ecosystem/hyperdom";
import { packageIdFromPathname, type PackageNavGroup } from "@core/content/package-nav.js";
import { resolveNavIcon, resolvePackageGroupIcon } from "@core/content/resolve-nav-icon.js";
import { docPageByContentId } from "@app/router/doc-pages.js";
import { navLinkStyles, shellStyles } from "@widgets/docs-shell/docs-shell.styles.js";
import { cn } from "@core/styles/cn.js";
import { NavIcon } from "@widgets/icons/nav-icons.js";

const shell = shellStyles();

/** One align effect per package group — view factory runs on every sidebar render. */
const packageGroupPathEffects = new Set<string>();

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

export const PackageNavGroupView = (group: PackageNavGroup): Child => {
  const $open = signal(readExpanded(group.id));

  const setOpen = (open: boolean): void => {
    $open.set(open);
    persistExpanded(group.id, open);
  };

  const toggle = (): void => setOpen(!$open.value());

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

  const childLink = (page: AnyPage, label: string, contentId: string, slug: string): Child =>
    div(
      {
        class: shell.packageChildWrap(),
        onmousedown: () => setOpen(true),
      },
      [
        NavLink({
          to: page,
          activeClass: navLinkStyles({ active: true, withIcon: true }),
          class: [navLinkStyles({ withIcon: true }), shell.packageChildLink()].join(" "),
          children: [
            NavIcon(resolveNavIcon(contentId, slug), shell.packageChildIcon()),
            span({ class: "min-w-0 truncate" }, label),
          ],
        }),
      ],
    );

  const groupIcon = resolvePackageGroupIcon(group.id);

  return div({ class: shell.packageGroup() }, [
    button(
      {
        type: "button",
        class: () => {
          const activePkg = typeof window !== "undefined" ? packageIdFromPathname(window.location.pathname) : null;
          return cn(
            shell.packageGroupBtn(),
            ($open.value() || activePkg === group.id) && shell.packageGroupBtnActive(),
          );
        },
        onClick: toggle,
      },
      [
        NavIcon(groupIcon, shell.packageGroupIcon()),
        span({ class: () => cn(shell.packageChevron(), $open.value() && shell.packageChevronOpen()) }, "▸"),
        span({ class: shell.packageGroupLabel() }, [
          span({ class: shell.packageGroupName() }, group.title),
          span({ class: shell.packageGroupPkg() }, group.npmPackage),
        ]),
      ],
    ),
    () =>
      $open.value()
        ? div({ class: shell.packageChildren() }, [
            ...group.children.map((child) =>
              childLink(
                docPageByContentId[child.contentId]!,
                child.title,
                child.contentId,
                child.slug,
              ),
            ),
          ])
        : null,
  ]);
};
