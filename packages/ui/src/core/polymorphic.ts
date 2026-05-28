import type { Child } from "@echojs/hyperdom";

/** Allows rendering a component as a different intrinsic element. */
export type PolymorphicProps<Tag extends string = "div"> = {
  as?: Tag;
  children?: Child;
};

export type PolymorphicComponentProps<
  Tag extends string,
  Props extends Record<string, unknown> = Record<string, never>,
> = PolymorphicProps<Tag> & Props;
