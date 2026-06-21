import { h, type Child, type Props } from "@echojs-ecosystem/hyperdom";

import type { UIContextValue } from "../theme/theme-context";
import { getUIContextOrDefault } from "../theme/theme-context";
import type { ComponentThemeConfig } from "../theme/types";
import { resolveVariantClasses } from "../theme/variants";
import { cn, type ClassValue } from "../utils/cn";
import { mergeProps } from "../utils/merge-props";
import {
  buildStripKeys,
  type DomPropsForTag,
  type ElementForTag,
  type UIComponentProps,
  toDomProps,
} from "./props-types";
import type { UIComponentBaseProps } from "./types";
import { hTag } from "./h-tag";
import { resolveVariantOptions } from "./variant-keys";

export type UIComponentRenderContext<
  TTag extends keyof HTMLElementTagNameMap,
  TOwnProps extends Record<string, unknown>,
  TOmit extends keyof Props<ElementForTag<TTag>> = never,
> = {
  /** Full merged props (own + DOM + theme). */
  props: UIComponentProps<TTag, TOwnProps, TOmit>;
  /** Props safe for `h(tag, domProps)` — component-only keys removed. */
  domProps: DomPropsForTag<TTag>;
  headless: boolean;
  className: string | undefined;
  ctx: UIContextValue;
};

export type CreateUIComponentConfig<
  TTag extends keyof HTMLElementTagNameMap,
  TOwnProps extends Record<string, unknown>,
  TOmit extends keyof Props<ElementForTag<TTag>> = never,
> = {
  /** PascalCase name (`Button` → theme key `button`). */
  name: string;
  /** Default intrinsic tag when using built-in render. */
  tag: TTag;
  /** Keys that never reach the DOM (icons, variants, layout flags, …). */
  ownKeys: readonly (keyof TOwnProps | keyof UIComponentBaseProps)[];
  defaultProps?: Partial<UIComponentProps<TTag, TOwnProps, TOmit>>;
  variants?: (options?: Record<string, unknown>) => string;
  render?: (context: UIComponentRenderContext<TTag, TOwnProps, TOmit>) => Child;
};

const themeKeyFromName = (name: string): string => name.charAt(0).toLowerCase() + name.slice(1);

const resolveHeadless = (props: UIComponentBaseProps, ctx: UIContextValue): boolean =>
  props.headless ?? ctx.headless ?? ctx.theme.headless ?? false;

const themePropsFromSlice = (themeSlice?: ComponentThemeConfig): Record<string, unknown> => {
  if (!themeSlice) return {};

  return {
    ...themeSlice.defaultProps,
    ...themeSlice.defaultVariants,
    ...(themeSlice.className ? { className: themeSlice.className } : {}),
  };
};

const resolveVisualClass = (
  headless: boolean,
  themeSlice: ComponentThemeConfig | undefined,
  variantClass: string | undefined,
  props: Record<string, unknown>,
): string | undefined => {
  if (headless) return undefined;

  return cn(
    themeSlice?.baseClass,
    themeSlice?.className,
    variantClass,
    props.className as ClassValue | undefined,
    props.class as ClassValue | undefined,
  );
};

/**
 * UI component factory.
 *
 * 1. Merge props: `defaultProps` → theme (`UIProvider`) → call props
 * 2. Resolve variant / theme classes
 * 3. Build `domProps` (DOM-only) and call custom `render`, or `h(tag, domProps, children)`
 */
export const createUIComponent = <
  TTag extends keyof HTMLElementTagNameMap,
  TOwnProps extends Record<string, unknown>,
  TOmit extends keyof Props<ElementForTag<TTag>> = never,
>(
  config: CreateUIComponentConfig<TTag, TOwnProps, TOmit>,
): ((props: UIComponentProps<TTag, TOwnProps, TOmit>) => Child) => {
  const themeKey = themeKeyFromName(config.name);
  const stripKeys = buildStripKeys(config.ownKeys as readonly string[], config.variants);

  return (props: UIComponentProps<TTag, TOwnProps, TOmit>): Child => {
    const ctx = getUIContextOrDefault();
    const themeSlice = ctx.theme.components?.[themeKey];
    const headless = resolveHeadless(props, ctx);

    const merged = mergeProps(
      config.defaultProps as Record<string, unknown> | undefined,
      themePropsFromSlice(themeSlice),
      props as Record<string, unknown>,
    ) as UIComponentProps<TTag, TOwnProps, TOmit> & Record<string, unknown>;

    const variantOptions = resolveVariantOptions(config.variants, themeSlice?.defaultVariants, merged);
    const variantClass = resolveVariantClasses(config.variants, variantOptions, headless);
    const visualClass = resolveVisualClass(headless, themeSlice, variantClass, merged);

    const { children, ...rest } = merged;
    const domProps = {
      ...toDomProps<TTag>(rest, stripKeys),
      className: visualClass,
      class: visualClass,
    } as DomPropsForTag<TTag>;

    const finalProps = { ...merged, className: visualClass, class: visualClass } as UIComponentProps<
      TTag,
      TOwnProps,
      TOmit
    >;

    if (config.render) {
      return config.render({ props: finalProps, domProps, headless, className: visualClass, ctx });
    }

    return hTag(config.tag, domProps as Props<ElementForTag<TTag>>, children);
  };
};
