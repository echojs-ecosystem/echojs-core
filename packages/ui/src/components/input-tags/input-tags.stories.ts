import type { Meta, StoryObj } from "@storybook/html";
import { h } from "@echojs/hyperdom";

import { hyperdomRender } from "../../storybook/story-helpers";
import { InputTags } from "./index";

const meta = {
  title: "InputTags",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: hyperdomRender(() =>
    InputTags({
      value: ["react", "hyperdom"],
      placeholder: "Add framework…",
      endContent: h("span", { className: "text-xs text-zinc-400" }, "Enter"),
    }),
  ),
};
