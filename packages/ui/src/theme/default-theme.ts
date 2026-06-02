import type { UITheme } from "./types";

/** Built-in theme used when no provider is mounted. */
export const defaultTheme: UITheme = {
  prefix: "echo",
  headless: false,
  components: {
    button: {
      defaultVariants: {
        variant: "primary",
        size: "md",
        radius: "full",
      },
    },
    input: {
      defaultVariants: {
        variant: "outline",
        size: "md",
      },
    },
    inputMask: {
      defaultVariants: {
        variant: "outline",
        size: "md",
      },
    },
    inputOtp: {
      defaultVariants: {
        variant: "outline",
        size: "md",
      },
    },
    inputTags: {
      defaultVariants: {
        variant: "outline",
        size: "md",
      },
    },
    textarea: {
      defaultVariants: {
        variant: "outline",
        size: "md",
        resize: "vertical",
      },
    },
    checkbox: {
      defaultVariants: {
        size: "md",
      },
    },
    iconButton: {
      defaultVariants: {
        variant: "ghost",
        size: "md",
      },
    },
  },
};
