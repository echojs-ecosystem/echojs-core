import { signal } from "@echojs-ecosystem/reactivity";
import { createModel } from "@echojs-ecosystem/hyperdom";
import { codeTabs } from "@entities/home/constants/home.constants.js";
import type { CodeTab, HomeVM } from "@entities/home/types/home.types.js";

export const createHomeModel = createModel((): HomeVM => {
  const $codeTab = signal(0);

  return {
    activeCodeTab: (): CodeTab => codeTabs[$codeTab.value()] ?? codeTabs[0]!,
    setCodeTab: (index: number) => $codeTab.set(index),
    isCodeTabActive: (index: number) => $codeTab.value() === index,
  };
}, "HomeModel");
