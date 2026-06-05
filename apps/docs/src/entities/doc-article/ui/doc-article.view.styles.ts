import { tv } from "tailwind-variants";

export const docArticlePageStyles = tv({
  slots: {
    docPage: "py-6 sm:py-8 lg:py-10",
    docProse: "max-w-3xl",
  },
});

export const docLayoutStyles = tv({
  slots: {
    article: "flex w-full",
    main: "flex min-w-0 flex-1 justify-center px-4 sm:px-8 lg:px-10",
    mainInner: "w-full min-w-0 max-w-3xl",
    tocAside: "hidden w-72 shrink-0 xl:block xl:pr-6 2xl:w-80 2xl:pr-10",
    tocSticky: "sticky top-24 pb-8",
  },
});

export const skeletonStyles = tv({
  slots: {
    root: "animate-pulse space-y-4",
    title: "h-10 w-2/3 rounded-lg bg-surface-muted",
    line: "h-4 w-full rounded bg-surface-muted",
    lineShort: "h-4 w-5/6 rounded bg-surface-muted",
  },
});
