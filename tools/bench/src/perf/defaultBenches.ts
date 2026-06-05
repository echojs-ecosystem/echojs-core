import type { BenchCase } from "./types.js";

export async function createDefaultBenches(enabledPackages?: string[]): Promise<BenchCase[]> {
  const allow = (name: string) => !enabledPackages?.length || enabledPackages.includes(name);
  const cases: BenchCase[] = [];

  if (allow("reactivity")) {
    const reactivity = (await import("@echojs-ecosystem/reactivity")) as typeof import("@echojs-ecosystem/reactivity");

    cases.push(
      {
        group: "reactivity",
        name: "signal: set() tight loop (1e6)",
        iterations: 1,
        warmupIterations: 1,
        fn: () => {
          const s = reactivity.signal(0);
          for (let i = 0; i < 1_000_000; i++) s.set(i);
        },
      },
      {
        group: "reactivity",
        name: "computed: read() tight loop (1e6)",
        iterations: 1,
        warmupIterations: 1,
        fn: () => {
          const a = reactivity.signal(1);
          const b = reactivity.computed(() => a.value() + 1);
          let acc = 0;
          for (let i = 0; i < 1_000_000; i++) {
            a.set(i);
            acc += b.value();
          }
          if (acc === Number.MIN_SAFE_INTEGER) throw new Error("unreachable");
        },
      },
    );
  }

  if (allow("store")) {
    const storePkg = (await import("@echojs-ecosystem/store")) as typeof import("@echojs-ecosystem/store");
    cases.push({
      group: "store",
      name: "createStore + 10k set()",
      iterations: 5,
      warmupIterations: 2,
      fn: () => {
        const store = storePkg.createStore({ count: 0 });
        for (let i = 0; i < 10_000; i++) store.set({ count: i });
      },
    });
  }

  if (allow("router")) {
    const router = (await import("@echojs-ecosystem/router")) as typeof import("@echojs-ecosystem/router");
    cases.push({
      group: "router",
      name: "matchPath 100k",
      iterations: 2,
      warmupIterations: 1,
      fn: () => {
        for (let i = 0; i < 100_000; i++) {
          router.matchPath("/users/:id", `/users/${i}`);
        }
      },
    });
  }

  return cases;
}

