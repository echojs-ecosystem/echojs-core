import { createModel } from "@echojs-ecosystem/hyperdom";
import type { SponsorsVM } from "@entities/sponsors/types/sponsors.types.js";

export const createSponsorsModel = createModel((): SponsorsVM => ({}), "SponsorsModel");
