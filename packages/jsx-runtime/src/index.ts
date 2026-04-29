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

// JSX Runtime
export { jsx, jsxs, jsxDEV, Fragment } from "./jsx-runtime.js";

// Component system
export { createComponent, isComponent, getComponentDispose } from "./component.js";

// Mount utilities
export { mount, unmount, render, renderToString, createRoot } from "./mount.js";

// Directive helpers (for advanced use)
export { _$if, _$switch } from "./directives/if.js";
export { showDirective, applyShowDirective } from "./directives/show.js";

// Internal utilities (for advanced use)
export { insert } from "./insert.js";
export { createTextNode, createReactiveText } from "./text.js";
export { createElement, setProp, setProps } from "./element.js";
export { setEvent, setEvents } from "./events.js";
export { isSignalish, isFunction } from "./internals/utils.js";

// Types
export type {
  JSXElement,
  Signalish,
  JSXProps,
  JSXComponent,
  ComponentVM,
  ViewModelFn,
  ViewFn,
  EventHandler,
  EventModifiers,
  DirectiveProps,
  HTMLAttributeValue,
  ReactiveAttributeConfig,
  MountResult,
} from "./types.js";

export type { Component } from "./component.js";
