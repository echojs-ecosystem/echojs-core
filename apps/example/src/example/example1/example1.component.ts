import { createComponent } from "@echojs/hyperdom";
import { createExample1Model } from "./example1.model";
import { Example1View } from "./example1.view";

export const Example1Component = createComponent(createExample1Model, Example1View);
