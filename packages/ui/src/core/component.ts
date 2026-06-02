import { h, type Child, type Props } from "@echojs/hyperdom";
import type { UIContextValue } from "../theme/theme-context";
import { getUIContextOrDefault } from "../theme/theme-context";
import { resolveVariantClasses } from "../theme/variants";
import { resolveVariantOptions } from "./variant-keys";
import { cn } from "../utils/cn";
import { mergeProps } from "../utils/merge-props";
import type { UIComponentBaseProps } from "./types";

export type UIComponentRenderContext<
  TProps extends UIComponentBaseProps,
  TElement extends Element = HTMLElement,
> = {
  props: TProps & Props<TElement>;
  headless: boolean;
  className: string | undefined;
  ctx: UIContextValue;
};

export type CreateUIComponentConfig<
  TProps extends UIComponentBaseProps,
  TElement extends Element = HTMLElement,
> = {
  /** PascalCase component name (used for theme key: `Button` → `button`). */
  name: string;
  defaultTag: keyof HTMLElementTagNameMap;
  defaultProps?: Partial<TProps>;
  variants?: (options?: Record<string, unknown>) => string;
  render?: (context: UIComponentRenderContext<TProps, TElement>) => Child;
};

const themeKeyFromName = (name: string): string => name.charAt(0).toLowerCase() + name.slice(1);

/**
 * Factory for hyperdom UI components with theme, provider, and headless support.
 */
export const createUIComponent = <
  TProps extends UIComponentBaseProps,
  TElement extends HTMLElement = HTMLElement,
>(
  config: CreateUIComponentConfig<TProps, TElement>,
): ((props: TProps) => Child) => {
  const themeKey = themeKeyFromName(config.name);

  return (props: TProps): Child => {
    const ctx = getUIContextOrDefault();
    const themeSlice = ctx.theme.components?.[themeKey];

    const headless = props.headless ?? ctx.headless ?? ctx.theme.headless ?? false;

    const providerProps: Record<string, unknown> = {
      ...themeSlice?.defaultProps,
      ...themeSlice?.defaultVariants,
    };

    if (themeSlice?.className) {
      providerProps.className = themeSlice.className;
    }

    const merged = mergeProps(
      config.defaultProps as Record<string, unknown> | undefined,
      providerProps,
      props as Record<string, unknown>,
    ) as TProps & Record<string, unknown>;

    const variantOptions = resolveVariantOptions(
      config.variants as Parameters<typeof resolveVariantOptions>[0],
      themeSlice?.defaultVariants,
      merged,
    );

    const variantClass = resolveVariantClasses(config.variants, variantOptions, headless);

    const visualClass = headless
      ? undefined
      : cn(themeSlice?.baseClass, themeSlice?.className, variantClass, merged.className, merged.class);

    const finalProps = {
      ...merged,
      className: visualClass,
      class: visualClass,
    } as TProps & Props<TElement>;

    if (config.render) {
      return config.render({
        props: finalProps,
        headless,
        className: visualClass,
        ctx,
      });
    }

    const { children, as, ...rest } = finalProps as TProps &
      Props<TElement> & { as?: keyof HTMLElementTagNameMap };
    const tag = (as ?? config.defaultTag) as keyof HTMLElementTagNameMap;

    // `h()` has a narrow tag type; `as` is runtime-configurable, so we cast here.
    return h(tag as any, rest as Props<TElement>, children);
  };
};
