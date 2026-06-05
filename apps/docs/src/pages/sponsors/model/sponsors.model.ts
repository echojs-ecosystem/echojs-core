import { createModel } from "@echojs/hyperdom";
import type { SponsorsVM } from "@pages/sponsors/types/sponsors.types.js";

export const createSponsorsModel = createModel((): SponsorsVM => ({}), "SponsorsModel");
