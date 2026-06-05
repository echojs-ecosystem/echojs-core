import { tv } from "tailwind-variants";

export const docsLayoutStyles = tv({
  slots: {
    shell: "min-h-dvh bg-surface lg:flex",
    shellMain: "flex min-w-0 flex-1 flex-col",
    shellContent: "flex-1 bg-surface",
  },
});
