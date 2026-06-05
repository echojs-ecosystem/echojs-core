import { tv } from "tailwind-variants";

export const pageLayoutStyles = tv({
  slots: {
    root: "min-h-dvh",
    container: "mx-auto max-w-6xl px-6 pb-24 lg:px-8",
    docPage: "py-8 lg:py-10",
    docProse: "max-w-3xl",
    shell: "min-h-dvh bg-surface lg:flex",
    shellMain: "flex min-w-0 flex-1 flex-col",
    shellContent: "flex-1 bg-surface",
  },
});

export const routerStateStyles = tv({
  slots: {
    center: "flex min-h-[40vh] items-center justify-center",
    message: "text-fg-muted",
    page: "mx-auto max-w-lg px-6 py-24 text-center",
    title: "text-2xl font-semibold",
    body: "mt-4 text-fg-muted",
    link: "text-echo-700 hover:underline dark:text-echo-400",
    linkWrap: "mt-8",
    error: "text-red-600",
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
