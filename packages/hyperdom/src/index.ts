export { h } from "./h";
export { render } from "./render";
export { mount } from "./mount";
export { createModel, isInModelContext } from "./create-model";
export type {
  CreateModelOptions,
  ModelFactory,
  ModelFactoryFn,
  ModelSection,
  ModelSectionRecord,
  StructuredModelShape,
} from "./create-model";
export { createView } from "./create-view";
export {
  createCompoundView,
  createSlotView,
  collectSlotMarkers,
  isSlotMarker,
  type CompoundCallFn,
  type CompoundPartDefs,
  type CompoundPartFn,
  type CompoundRootFn,
  type CompoundSlotDefs,
  type CompoundSlotFn,
  type CompoundView,
  type CompoundViewConfig,
  type MappedCompoundParts,
  type MappedCompoundSlots,
  type SlotMarker,
  type SlotRenderers,
} from "./compound";
export { isInViewContext } from "./view-context";
export {
  createComponent,
  type ViewFn,
  type CreateComponentOptions,
} from "./component";
export {
  createAsyncComponent,
  type AsyncComponent,
  type AsyncComponentChunk,
  type AsyncComponentLoader,
  type AsyncErrorComponent,
  type AsyncLoadingComponent,
  type CreateAsyncComponentOptions,
} from "./create-async-component";
export { setStrictContextChecks, getStrictContextChecks } from "./config";
export { Show } from "./control/show";
export { List } from "./control/list";
export {
  Match,
  MatchBuilder,
  P,
  isMatching,
  matches,
  type InvertPattern,
  type MatchCase,
  type OtherwiseCase,
  type Pattern,
  type TypePattern,
  type WhenCase,
  type WhenPattern,
  type Wildcard,
} from "./control/match";
export * from "./dsl";

export type { Child, Props, Component } from "./types";
