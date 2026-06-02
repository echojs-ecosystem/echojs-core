import type { Meta, StoryObj } from "@storybook/html";
import { h } from "@echojs/hyperdom";

import { Field } from "../field";
import { Label } from "../label";
import { hyperdomRender } from "../../storybook/story-helpers";
import { UIProvider } from "../../providers";
import { createTheme } from "../../theme";
import { Checkbox, type CheckboxSize } from "./index";

type CheckboxStoryArgs = {
  label: string;
  size: CheckboxSize;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  invalid: boolean;
  headless: boolean;
  withField: boolean;
};

const CheckboxWithLabel = (options: {
  label: string;
  disabled?: boolean;
  headless?: boolean;
  checkbox: Parameters<typeof Checkbox>[0];
}) =>
  h(
    "label",
    {
      className: "inline-flex items-center gap-2",
      ...(options.disabled ? { "data-disabled": "" } : {}),
    },
    [
      Checkbox(options.checkbox),
      Label({ headless: options.headless, children: options.label }),
    ],
  );

const meta = {
  title: "Checkbox",
  tags: ["autodocs"],
  render: hyperdomRender((args) => {
    const a = args as CheckboxStoryArgs;

    const control = Checkbox({
      size: a.size,
      checked: a.checked,
      indeterminate: a.indeterminate,
      disabled: a.disabled,
      invalid: a.invalid,
      headless: a.headless,
      "aria-label": a.withField ? undefined : a.label,
    });

    if (a.withField) {
      return Field({
        label: a.label,
        description: "You can change this preference anytime in settings.",
        error: a.invalid ? "You must accept to continue" : undefined,
        invalid: a.invalid,
        disabled: a.disabled,
        children: (ctx) =>
          Checkbox({
            ...ctx.inputProps,
            size: a.size,
            checked: a.checked,
            indeterminate: a.indeterminate,
            headless: a.headless,
          }),
      });
    }

    return CheckboxWithLabel({
      label: a.label,
      disabled: a.disabled,
      headless: a.headless,
      checkbox: {
        size: a.size,
        checked: a.checked,
        indeterminate: a.indeterminate,
        disabled: a.disabled,
        invalid: a.invalid,
        headless: a.headless,
      },
    });
  }),
  argTypes: {
    label: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    headless: { control: "boolean" },
    withField: { control: "boolean" },
  },
  args: {
    label: "Accept terms and conditions",
    size: "md",
    checked: false,
    indeterminate: false,
    disabled: false,
    invalid: false,
    headless: false,
    withField: false,
  },
} satisfies Meta<CheckboxStoryArgs>;

export default meta;

type Story = StoryObj<CheckboxStoryArgs>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Sizes: Story = {
  render: hyperdomRender(() =>
    h("div", { className: "flex flex-col gap-3" }, [
      CheckboxWithLabel({
        label: "Small",
        checkbox: { size: "sm", checked: true },
      }),
      CheckboxWithLabel({
        label: "Medium",
        checkbox: { size: "md", checked: true },
      }),
      CheckboxWithLabel({
        label: "Large",
        checkbox: { size: "lg", checked: true },
      }),
    ]),
  ),
};

export const Invalid: Story = {
  args: { invalid: true, label: "Required agreement" },
};

export const Disabled: Story = {
  args: { disabled: true, checked: true },
};

export const Headless: Story = {
  args: { headless: true, label: "Headless (no visual classes on control)" },
};

export const WithField: Story = {
  args: { withField: true, invalid: true },
};

export const ProviderOverrides: Story = {
  render: hyperdomRender(() => {
    const theme = createTheme({
      components: {
        checkbox: {
          defaultVariants: { size: "lg" },
          className: "ring-1 ring-zinc-200",
        },
      },
    });

    return UIProvider({
      theme,
      children: () =>
        h("div", { className: "flex flex-col gap-2" }, [
          CheckboxWithLabel({
            label: "Provider default (lg + ring)",
            checkbox: { checked: true },
          }),
          CheckboxWithLabel({
            label: "Local size override",
            checkbox: { size: "sm", checked: true },
          }),
        ]),
    });
  }),
};
