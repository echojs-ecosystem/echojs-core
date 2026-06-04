export {
  createProvider,
  type CreateProviderOptions,
  type EchoProviderWithInstance,
} from "./create-provider";

/** @deprecated Use {@link createProvider} from `./create-provider` */
export { createProvider as createPlugin } from "./create-provider";

/** @deprecated Use {@link CreateProviderOptions} */
export type { CreateProviderOptions as CreatePluginOptions } from "./create-provider";

/** @deprecated Use {@link EchoProviderWithInstance} */
export type { EchoProviderWithInstance as EchoPluginWithInstance } from "./create-provider";
