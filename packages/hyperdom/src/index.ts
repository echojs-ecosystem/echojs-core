export { h } from "./hyperscript";
export { render, mount } from "./render";
export { createModel, isInModelContext } from "./model";
export type {
  CreateModelOptions,
  ModelFactory,
  ModelFactoryFn,
  ModelSection,
  ModelSectionRecord,
  StructuredModelShape,
} from "./model";
export { createView } from "./view";
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
export { isInViewContext, getStrictContextChecks, setStrictContextChecks } from "./core";
export {
  createComponent,
  createAsyncComponent,
  type ViewFn,
  type CreateComponentOptions,
  type AsyncComponent,
  type AsyncComponentChunk,
  type AsyncComponentLoader,
  type AsyncErrorComponent,
  type AsyncLoadingComponent,
  type CreateAsyncComponentOptions,
} from "./component/index";
export {
  effect,
  type ModelEffect,
  type ModelLifecycleCleanup,
  type WatchCallback,
  type WatchOptions,
  type WatchSource,
} from "./model";
export { Show } from "./control/show";
export { If, IfBuilder } from "./control/if";
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

export type { Child, Props, Component } from "./core";
