import type { Meta, StoryObj } from "@storybook/html";
import { h } from "@echojs-ecosystem/hyperdom";

import { Field } from "../field";
import { mergeFieldControlProps } from "../field/merge-field-control-props";
import { hyperdomRender } from "../../storybook/story-helpers";
import { Input } from "./index";

const meta = {
  title: "Input",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: hyperdomRender(() =>
    Input({ placeholder: "you@example.com", type: "email" }),
  ),
};

export const WithSlots: Story = {
  render: hyperdomRender(() =>
    Input({
      startContent: h("span", { className: "text-sm text-zinc-500" }, "https://"),
      endContent: h("span", { className: "text-sm text-zinc-500" }, ".com"),
      placeholder: "site",
    }),
  ),
};

export const WithField: Story = {
  render: hyperdomRender(() =>
    Field({
      label: "Email",
      description: "We will never share your email.",
      children: (ctx) =>
        Input(
          mergeFieldControlProps(ctx.inputProps, {
            type: "email",
            placeholder: "you@example.com",
            startContent: h("span", { className: "text-zinc-400" }, "@"),
          }),
        ),
    }),
  ),
};

export const Invalid: Story = {
  render: hyperdomRender(() =>
    Input({ invalid: true, placeholder: "Invalid state", defaultValue: "bad@" }),
  ),
};
