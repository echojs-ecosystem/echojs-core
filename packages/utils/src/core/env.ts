export const isClient = typeof window !== "undefined";

export const isServer = !isClient;

export const defaultWindow: Window | undefined = isClient ? window : undefined;

export const defaultDocument: Document | undefined = isClient ? document : undefined;

export const defaultNavigator: Navigator | undefined = isClient ? navigator : undefined;
