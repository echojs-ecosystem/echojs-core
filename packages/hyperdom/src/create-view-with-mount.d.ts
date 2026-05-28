import type { Child } from "./types";
import type { MountCleanup } from "./lifecycle/on-mount";
export declare const createViewWithMount: <VM = void>(onMount: (vm: VM) => MountCleanup, name: string, viewFn: (vm: VM) => Child) => ((vm: VM) => Child);
//# sourceMappingURL=create-view-with-mount.d.ts.map