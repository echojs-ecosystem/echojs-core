import { describe, expect, it } from "vitest";
import { createTheme } from "./create-theme";
import { defaultTheme } from "./default-theme";

describe("createTheme", () => {
  it("merges component defaultVariants", () => {
    const theme = createTheme({
      components: {
        button: {
          defaultVariants: { variant: "primary", size: "md" },
        },
      },
    });

    expect(theme.components?.button?.defaultVariants).toEqual({
      variant: "primary",
      size: "md",
      radius: "full",
    });
  });

  it("inherits prefix from base theme", () => {
    const theme = createTheme({ components: {} }, defaultTheme);
    expect(theme.prefix).toBe("echo");
  });

  it("deep-merges defaultProps without dropping base keys", () => {
    const base = createTheme({
      components: {
        button: { defaultProps: { type: "button" } },
      },
    });

    const next = createTheme(
      {
        components: {
          button: { defaultProps: { disabled: false } },
        },
      },
      base,
    );

    expect(next.components?.button?.defaultProps).toEqual({
      type: "button",
      disabled: false,
    });
  });
});

