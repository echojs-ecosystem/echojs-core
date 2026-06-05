import type { Meta, StoryObj } from "@storybook/html";
import { h } from "@echojs-ecosystem/hyperdom";

import {
  Button,
  type ButtonRadius,
  type ButtonSize,
  type ButtonVariant,
} from "./index";
import { UIProvider } from "../../providers";
import { hyperdomRender } from "../../storybook/story-helpers";
import { createTheme } from "../../theme";

type ButtonStoryArgs = {
  label: string;
  variant: ButtonVariant;
  size: ButtonSize;
  radius: ButtonRadius;
  fullWidth: boolean;
  iconOnly: boolean;
  pending: boolean;
  disabled: boolean;
  headless: boolean;
};

const IconDot = () => h("span", { className: "font-bold leading-none" }, "→");

const meta = {
  title: "Button",
  tags: ["autodocs"],
  render: hyperdomRender((args) => {
    const a = args as ButtonStoryArgs;
    return Button({
      variant: a.variant,
      size: a.size,
      radius: a.radius,
      fullWidth: a.fullWidth,
      iconOnly: a.iconOnly,
      pending: a.pending,
      disabled: a.disabled,
      headless: a.headless,
      children: a.iconOnly ? IconDot() : a.label,
      ...(a.iconOnly ? { "aria-label": a.label } : {}),
    });
  }),
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "outline",
        "ghost",
        "danger",
        "dangerSoft",
        "link",
      ],
    },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    radius: { control: "select", options: ["none", "sm", "md", "lg", "full"] },
    fullWidth: { control: "boolean" },
    iconOnly: { control: "boolean" },
    pending: { control: "boolean" },
    disabled: { control: "boolean" },
    headless: { control: "boolean" },
  },
  args: {
    label: "Click me",
    variant: "primary",
    size: "md",
    radius: "full",
    fullWidth: false,
    iconOnly: false,
    pending: false,
    disabled: false,
    headless: false,
  },
} satisfies Meta<ButtonStoryArgs>;

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

export const Default: Story = {};

export const Variants: Story = {
  render: hyperdomRender(() =>
    h("div", { className: "flex flex-wrap gap-2" }, [
      Button({ variant: "primary", children: "Primary" }),
      Button({ variant: "secondary", children: "Secondary" }),
      Button({ variant: "tertiary", children: "Tertiary" }),
      Button({ variant: "outline", children: "Outline" }),
      Button({ variant: "ghost", children: "Ghost" }),
      Button({ variant: "danger", children: "Danger" }),
      Button({ variant: "dangerSoft", children: "Danger soft" }),
    ]),
  ),
};

export const Sizes: Story = {
  render: hyperdomRender(() =>
    h("div", { className: "flex flex-wrap items-center gap-2" }, [
      Button({ size: "sm", children: "Small" }),
      Button({ size: "md", children: "Medium" }),
      Button({ size: "lg", children: "Large" }),
    ]),
  ),
};

export const IconOnly: Story = {
  render: hyperdomRender(() =>
    h("div", { className: "flex items-center gap-2" }, [
      Button({ iconOnly: true, "aria-label": "Settings", children: IconDot() }),
      Button({ iconOnly: true, variant: "outline", size: "sm", "aria-label": "More", children: IconDot() }),
      Button({ iconOnly: true, variant: "danger", size: "lg", "aria-label": "Delete", children: IconDot() }),
    ]),
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, label: "Full width button" },
};

export const WithIcons: Story = {
  render: hyperdomRender((args) => {
    const a = args as ButtonStoryArgs;
    return h("div", { className: "flex flex-wrap gap-2" }, [
      Button({ leftIcon: IconDot(), children: a.label }),
      Button({ rightIcon: IconDot(), children: a.label }),
    ]);
  }),
};

export const Pending: Story = {
  args: { pending: true, label: "Uploading…" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled" },
};

export const Headless: Story = {
  args: { headless: true, label: "Headless (no visual classes)" },
};

export const ProviderOverrides: Story = {
  render: hyperdomRender(() => {
    const theme = createTheme({
      components: {
        button: {
          defaultVariants: { variant: "secondary", size: "lg" },
          className: "shadow-sm",
        },
      },
    });

    return UIProvider({
      theme,
      children: () =>
        h("div", { className: "flex flex-col gap-2" }, [
          Button({ children: "From provider defaults" }),
          Button({ variant: "primary", className: "ring-2 ring-zinc-300", children: "Local override" }),
        ]),
    });
  }),
};

export const Playground: Story = {};
