import { expectTypeOf } from "vitest";

import { Button } from "./button";
import type { ButtonProps, ButtonRadius, ButtonSize, ButtonVariant } from "./button.types";

expectTypeOf<ButtonProps["variant"]>().toEqualTypeOf<ButtonVariant | undefined>();
expectTypeOf(Button({ children: "Save" })).toEqualTypeOf<import("@echojs/hyperdom").Child>();

expectTypeOf<ButtonProps["size"]>().toEqualTypeOf<ButtonSize | undefined>();
expectTypeOf<ButtonProps["radius"]>().toEqualTypeOf<ButtonRadius | undefined>();
expectTypeOf<ButtonProps["loading"]>().toEqualTypeOf<boolean | undefined>();
