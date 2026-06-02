import type { Meta, StoryObj } from "@storybook/html";

import { hyperdomRender } from "../../storybook/story-helpers";
import { InputOtp } from "./index";

const meta = {
  title: "InputOtp",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: hyperdomRender(() => InputOtp({ length: 6, value: "123" })),
};
