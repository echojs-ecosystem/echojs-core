import { createView, type Child } from "@echojs-ecosystem/hyperdom";
import { div, h, span } from "@echojs-ecosystem/hyperdom";
import { getDocPage } from "@app/router/doc-pages.js";
import { docPath, getAdjacentDocNavItems } from "@core/content/nav.js";
import type { ContentId } from "@core/content/types.js";
import type { DocsNavItemEnriched } from "@core/content/types.js";
import { docPagerStyles } from "@widgets/doc-pager/ui/doc-pager.view.styles.js";
import { NavIcon } from "@widgets/icons/nav-icons.js";

const pager = docPagerStyles();

const pagerLink = (item: DocsNavItemEnriched, direction: "prev" | "next"): Child => {
  const page = getDocPage(item.contentId);
  const isNext = direction === "next";
  const label = isNext ? "Next" : "Previous";

  return h(
    "a",
    {
      href: docPath(item.sectionSlug, item.slug),
      class: [pager.link(), isNext ? pager.linkNext() : ""].filter(Boolean).join(" "),
      onClick: (e: MouseEvent) => {
        e.preventDefault();
        page.go(undefined);
      },
    },
    [
      span({ class: pager.icon() }, [
        NavIcon("chevron-right", isNext ? undefined : "rotate-180"),
      ]),
      div({ class: pager.body() }, [
        span({ class: pager.label() }, label),
        span({ class: pager.title() }, item.title),
        span({ class: pager.meta() }, item.sectionTitle),
      ]),
    ],
  );
};

export const DocPager = createView((contentId: ContentId): Child => {
  const { prev, next } = getAdjacentDocNavItems(contentId);
  if (!prev && !next) return null;

  return div({ class: pager.root() }, [
    prev ? div({ class: pager.cell() }, pagerLink(prev, "prev")) : span({ class: "hidden sm:block sm:flex-1" }),
    next
      ? div({ class: [pager.cell(), pager.cellNext()].join(" ") }, pagerLink(next, "next"))
      : span({ class: "hidden sm:block sm:flex-1" }),
  ]);
}, "DocPager");
