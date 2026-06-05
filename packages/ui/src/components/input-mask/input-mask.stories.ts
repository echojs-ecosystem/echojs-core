import type { Meta, StoryObj } from "@storybook/html";
import { h } from "@echojs-ecosystem/hyperdom";

import { hyperdomRender } from "../../storybook/story-helpers";
import { InputMask } from "./index";

const meta = {
  title: "InputMask",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Phone: Story = {
  render: hyperdomRender(() =>
    InputMask({
      mask: "phone",
      placeholder: "(00) 00000-0000",
      startContent: h("span", { className: "text-zinc-400" }, "📞"),
    }),
  ),
};

export const Cpf: Story = {
  render: hyperdomRender(() =>
    InputMask({
      mask: "cpf",
      placeholder: "000.000.000-00",
    }),
  ),
};
