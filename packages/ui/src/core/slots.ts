import type { Child } from "@echojs-ecosystem/hyperdom";

export type SlotProps = {
  children?: Child;
};

/**
 * Returns slot children unchanged.
 *
 * Placeholder for future slot composition (icons, labels, etc.).
 */
export const renderSlot = (props: SlotProps): Child | undefined => props.children;
