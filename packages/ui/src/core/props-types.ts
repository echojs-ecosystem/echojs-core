import type { Props } from "@echojs-ecosystem/hyperdom";

import type { UIComponentBaseProps } from "./types";
import { getVariantKeysFromFn } from "./variant-keys";

/** Maps an intrinsic tag to its element type. */
export type ElementForTag<TTag extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[TTag];

/**
 * Public component props = base UI props + valid DOM props for the tag + component-only props.
 *
 * @example
 * type ButtonOwn = { variant?: "primary" };
 * type ButtonProps = UIComponentProps<"button", ButtonOwn>;
 */
export type UIComponentProps<
  TTag extends keyof HTMLElementTagNameMap,
  TOwnProps extends Record<string, unknown>,
  TOmit extends keyof Props<ElementForTag<TTag>> = never,
> = UIComponentBaseProps &
  Omit<Props<ElementForTag<TTag>>, TOmit | keyof UIComponentBaseProps> &
  TOwnProps;

export type DomPropsForTag<TTag extends keyof HTMLElementTagNameMap> = Props<ElementForTag<TTag>>;

const ALWAYS_STRIP = new Set(["headless", "children"]);

export const buildStripKeys = (
  ownKeys: readonly string[],
  variantsFn?: Parameters<typeof getVariantKeysFromFn>[0],
): Set<string> =>
  new Set([...ALWAYS_STRIP, ...ownKeys, ...getVariantKeysFromFn(variantsFn)]);

/** Removes component-only keys before passing props to `h()`. */
export const toDomProps = <TTag extends keyof HTMLElementTagNameMap>(
  props: Record<string, unknown>,
  stripKeys: ReadonlySet<string>,
): DomPropsForTag<TTag> => {
  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (stripKeys.has(key) || value === undefined) continue;
    out[key] = value;
  }

  return out as DomPropsForTag<TTag>;
};
