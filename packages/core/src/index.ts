// Core reactivity exports (re-exported for convenience)
export {
  signal,
  computed,
  effect,
  scope,
  cleanup,
  batch,
  isSignal as isSignalBase,
  isReadonlySignal as isReadonlySignalBase,
} from "@echojs-ecosystem/reactivity";

export type { Signal, ReadonlySignal, ReadValue, DeepReadonly } from "@echojs-ecosystem/reactivity";

// Component system - новый API с createModel и createView
export {
  createComponent,
  createModel,
  createView,
  isComponent,
  getComponentDispose,
} from "./component";

// Mount utilities
export { mount, unmount, render, renderToString, createRoot } from "./mount";

// Directive helpers (for advanced use)
export { _$if, _$switch } from "./directives/if";
export { showDirective, applyShowDirective } from "./directives/show";

// Internal utilities (for advanced use)
export { insert } from "./insert";
export { createTextNode, createReactiveText } from "./text";
export { createElement, setProp, setProps } from "./element";
export { setEvent, setEvents } from "./events";
export { isSignalish, isFunction } from "./internals/utils";

// Types
export type {
  JSXElement,
  Signalish,
  JSXProps,
  JSXComponent,
  ComponentVM,
  ViewModelFn,
  ViewFn,
  ModelContext,
  ModelResult,
  EventHandler,
  EventModifiers,
  DirectiveProps,
  HTMLAttributeValue,
  ReactiveAttributeConfig,
  MountResult,
} from "./types";

export type { Component, ModelFn, ModelContextType } from "./component";

