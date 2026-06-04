import { render, setStrictContextChecks } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";

import { applyBodyAttributes } from "./apply-body-attributes";
import { normalizeEchoProvider } from "./normalize-plugin";
import type { EchoApp, EchoAppOptions, EchoProvider, EchoProvideKey, EchoRootSource, EchoUseInput } from "./types";
import {
  normalizeEchoAppOptions,
  resolveAppRoot,
  resolveProviderRoot,
} from "./resolve-app-options";

const resolveMountTarget = (target: string | Element): Element => {
  if (typeof target !== "string") {
    if (!(target instanceof Element)) {
      throw new Error("echojs: mount target must be an Element");
    }
    return target;
  }

  const el = document.querySelector(target);
  if (!el || !(el instanceof Element)) {
    throw new Error(`echojs: mount target not found: ${target}`);
  }
  return el;
};

export function createEchoApp(): EchoApp;
export function createEchoApp(root: EchoRootSource): EchoApp;
export function createEchoApp(options: EchoAppOptions): EchoApp;
export function createEchoApp(input?: EchoRootSource | EchoAppOptions): EchoApp {
  const options = normalizeEchoAppOptions(input);

  if (options.strictContextChecks !== undefined) {
    setStrictContextChecks(options.strictContextChecks);
  }

  const providers: EchoProvider[] = [];
  const provided = new Map<EchoProvideKey, unknown>();
  const pendingSetups: Promise<void>[] = [];

  const app: EchoApp = {
    use(providerInput) {
      const provider = normalizeEchoProvider(providerInput as EchoUseInput);
      providers.push(provider);
      if (provider.setup) {
        const result = provider.setup(app);
        if (result instanceof Promise) {
          pendingSetups.push(result);
        }
      }
      return app;
    },

    provide(key, value) {
      provided.set(key, value);
      return app;
    },

    inject(key) {
      return provided.get(key) as undefined;
    },

    has(key) {
      return provided.has(key);
    },

    async mount(target) {
      const awaitProviders = options.awaitProviders !== false;
      const setups = Promise.all(pendingSetups);

      if (awaitProviders) {
        await setups;
      }

      applyBodyAttributes(options.body);

      const resolvedRoot =
        options.view !== undefined
          ? await resolveAppRoot(options)
          : await resolveProviderRoot(providers);

      let renderRoot: () => Child = () => resolvedRoot;

      for (const provider of providers) {
        if (!provider.wrapRoot) continue;
        const previous = renderRoot;
        renderRoot = provider.wrapRoot(previous);
      }

      const dispose = render(renderRoot(), resolveMountTarget(target));

      if (!awaitProviders) {
        void setups;
      }

      return dispose;
    },
  };

  return app;
}
