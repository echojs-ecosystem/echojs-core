import { JSX as CoreJSX } from "./jsx-types";

declare global {
  namespace JSX {
    export import Element = CoreJSX.Element;
    export import IntrinsicElements = CoreJSX.IntrinsicElements;
  }
}

export {};
