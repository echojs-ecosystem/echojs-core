let strictContextChecks = false;

/** Enables/disables strict context checks for UI construction. */
export const setStrictContextChecks = (enabled: boolean): void => {
  strictContextChecks = enabled;
};

/** Returns current value of strict context checks. */
export const getStrictContextChecks = (): boolean => strictContextChecks;
