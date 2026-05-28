import type { ReadonlySignal, Signal } from "@echojs/reactivity";
import type { ModelContextType, ModelFn } from "./component";

export type Signalish<T> = T | Signal<T> | ReadonlySignal<T>;

export type JSXElement =
  | Node
  | Node[]
  | string
  | number
  | boolean
  | null
  | undefined
  | Signalish<unknown>
  | (() => unknown)
  | JSXElement[];

export type JSXProps = {
  [key: string]: unknown;
  children?: JSXElement;
};

export type JSXComponent<P = object> = (props: P) => JSXElement;

export type ComponentVM = Record<string, unknown>;

// Legacy types for backward compatibility
export type ViewModelFn<VM> = () => VM;

export type ViewFn<VM> = (vm: VM) => JSXElement;

// New model-based types
export type ModelContext = ModelContextType;

export type ModelResult<T> = T;

export type EventHandler = (event: Event) => void;

export type EventModifiers = {
  prevent?: boolean;
  stop?: boolean;
  capture?: boolean;
  once?: boolean;
  self?: boolean;
};

export interface DirectiveProps {
  if?: Signalish<boolean>;
  else?: boolean;
  "else-if"?: Signalish<boolean>;
  show?: Signalish<boolean>;
}

export type HTMLAttributeValue = string | number | boolean | null | undefined;

export interface ReactiveAttributeConfig {
  name: string;
  value: Signalish<HTMLAttributeValue>;
  isReactive: boolean;
}

export interface MountResult {
  node: Node;
  dispose: () => void;
}
