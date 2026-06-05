// App provider
export {
  createUiProvider,
  createUiPlugin,
  uiPlugin,
  type EchoUiProvider,
  type UiProviderOptions,
  type UiPlugin,
  type UiPluginOptions,
} from "./plugin/ui-plugin";

// Provider
export { UIProvider } from "./providers/UIProvider";
export type { UIProviderProps } from "./providers/UIProvider";

// Theme
export { createTheme } from "./theme/create-theme";
export { defaultTheme } from "./theme/default-theme";
export {
  getUIContext,
  getUIContextOrDefault,
  runWithUIContext,
  createUIContextValue,
  resetUIContextStack,
} from "./theme/theme-context";
export type { UIContextValue, CreateUIContextInput } from "./theme/theme-context";
export { createComponentVariants, resolveVariantClasses } from "./theme/variants";
export type { VariantProps } from "./theme/variants";
export type { UITokens } from "./theme/tokens";
export type { UITheme, ComponentThemeConfig } from "./theme/types";

// Core
export { createUIComponent } from "./core/component";
export type { CreateUIComponentConfig, UIComponentRenderContext } from "./core/component";
export type { UIComponentBaseProps } from "./core/types";
export { mergeProps } from "./core/props";
export { mergeRefs } from "./core/refs";
export { composeEventHandlers } from "./core/events";
export { ariaBool, dataState, dataDisabled, dataInvalid } from "./core/aria";
export { createId, useId } from "./core/ids";
export type { PolymorphicProps, PolymorphicComponentProps } from "./core/polymorphic";
export { renderSlot } from "./core/slots";

// Utils
export { cn, setClassNameMerger, resetClassNameMerger } from "./utils/cn";
export type { ClassValue, ClassDictionary, ClassNameMerger } from "./utils/cn";

// Primitives
export { VisuallyHidden } from "./primitives/visually-hidden";
export type { VisuallyHiddenProps } from "./primitives/visually-hidden";
export { Portal } from "./primitives/portal";
export type { PortalProps } from "./primitives/portal";

// Components
export { Button } from "./components/button/index";
export type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  ButtonRadius,
  ButtonVariantProps,
} from "./components/button/index";
export { defaultButtonSpinner, buttonStyles } from "./components/button/index";

export { IconButton } from "./components/icon-button/index";
export type { IconButtonProps, IconButtonSize } from "./components/icon-button/index";

export { Input } from "./components/input/index";
export type { InputProps, InputSize, InputVariant } from "./components/input/index";

export { InputMask } from "./components/input-mask/index";
export type { InputMaskProps } from "./components/input-mask/index";

export { InputOtp } from "./components/input-otp/index";
export type { InputOtpProps } from "./components/input-otp/index";

export { InputTags } from "./components/input-tags/index";
export type { InputTagsProps } from "./components/input-tags/index";

export { inputStyles } from "./components/input-shared/index";
export type { InputFieldProps } from "./components/input-shared/index";

export {
  attachInputMask,
  formatMaskedValue,
  parseMaskPattern,
  MASK_PRESETS,
  resolveMaskPattern,
} from "./utils/input-mask";
export type { MaskPattern, MaskPreset, MaskValue } from "./utils/input-mask";

export { Textarea } from "./components/textarea/index";
export type { TextareaProps, TextareaSize, TextareaVariant, TextareaResize } from "./components/textarea/index";

export { Label } from "./components/label/index";
export type { LabelProps } from "./components/label/index";

export { Field, getFieldContext, mergeFieldControlProps } from "./components/field/index";
export type { FieldProps, FieldContext } from "./components/field/index";

export { Checkbox } from "./components/checkbox/index";
export type { CheckboxProps, CheckboxSize, CheckboxVariantProps } from "./components/checkbox/index";

// Re-export hyperdom types used by consumers
export type { Child, Props, Component } from "@echojs-ecosystem/hyperdom";
