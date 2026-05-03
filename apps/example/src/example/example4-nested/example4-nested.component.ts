import { createComponent } from "@echojs/hyperdom";
import { createExample4NestedModel } from "./example4-nested.model";
import { Example4NestedView } from "./example4-nested.view";

export const Example4NestedComponent = createComponent(createExample4NestedModel, Example4NestedView);
