let viewDepth = 0;

export const isInViewContext = (): boolean => viewDepth > 0;

export const withViewContext = <T>(fn: () => T): T => {
  viewDepth++;
  try {
    return fn();
  } finally {
    viewDepth--;
  }
};

