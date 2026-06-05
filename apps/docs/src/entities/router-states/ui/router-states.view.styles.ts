import { tv } from "tailwind-variants";

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
