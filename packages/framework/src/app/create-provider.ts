import { defineProvider } from "./define-plugin";
import type { EchoApp, EchoProvider, EchoProvideKey } from "./types";

export type CreateProviderOptions<TInstance = void> = {
  name: string;
  /** Runs when the factory is called (usually at module load). */
  install?: () => TInstance;
  /** Runs on `app.use(provider)`. Receives the value from `install`. */
  setup?: (app: EchoApp, instance: TInstance) => void | Promise<void>;
  /** Registers `install()` result on the app via `provide`. */
  provideKey?: EchoProvideKey;
  wrapRoot?: EchoProvider["wrapRoot"];
};

export type EchoProviderWithInstance<TInstance> = EchoProvider & {
  readonly instance: TInstance;
};

/**
 * Factory for Echo app providers (Vue-style `install` + `setup`).
 *
 * ```ts
 * export const theme = createProvider({
 *   name: "theme",
 *   setup: async () => { await initTheme(); },
 * });
 * ```
 */
export const createProvider = <TInstance = void>(
  options: CreateProviderOptions<TInstance>,
): EchoProviderWithInstance<TInstance> => {
  const instance = options.install?.() as TInstance;

  const provider = defineProvider({
    name: options.name,
    wrapRoot: options.wrapRoot,
    async setup(app) {
      const value = (instance ?? options.install?.()) as TInstance;

      if (options.provideKey !== undefined && value !== undefined) {
        app.provide(options.provideKey, value);
      }

      if (options.setup) {
        await options.setup(app, value);
      }
    },
  });

  return Object.assign(provider, { instance }) as EchoProviderWithInstance<TInstance>;
};
