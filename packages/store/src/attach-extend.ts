import { assertExtensionKeys } from "./assert-extension-keys";
import type { ExtensionResult, Store, StoreExtension } from "./types";

export const attachExtend = <State>(store: Store<State>): void => {
  store.extend = <Ext extends StoreExtension<State, any>>(extension: Ext) => {
    const extensionResult = extension(store);
    assertExtensionKeys(store, extensionResult);
    Object.assign(store, extensionResult);
    return store as Store<State> & ExtensionResult<Ext>;
  };
};
