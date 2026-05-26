export type Child = string | number | boolean | null | undefined | Node | Child[] | (() => Child);
type Primitive = string | number | boolean | null | undefined;
export type MaybeReactive<T> = T | (() => T);
export type StyleObject = Record<string, string | number | null | undefined | false>;
export type ClassObject = Record<string, boolean | null | undefined>;
export type ClassValue = string | null | undefined | false | ClassObject | readonly ClassValue[];
export type StyleValue = string | StyleObject | null | undefined | false | readonly (string | StyleObject | null | undefined | false)[];
type NonFunctionKeys<T> = {
    [K in keyof T]-?: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];
type ElementLikeProps<E extends Element> = Omit<{
    [K in NonFunctionKeys<E>]?: MaybeReactive<E[K] | null | undefined>;
}, "style" | "className">;
type EventName = keyof GlobalEventHandlersEventMap;
export type DomEventHandler<E extends Element, K extends EventName> = (event: GlobalEventHandlersEventMap[K] & {
    currentTarget: E;
}) => void;
type EventModifier = "prevent" | "stop";
type ModifierSuffix = "" | `:${EventModifier}` | `:${EventModifier}:${EventModifier}` | `:${EventModifier}:${EventModifier}:${EventModifier}` | `:${EventModifier}:${EventModifier}:${EventModifier}:${EventModifier}`;
type OnProps<E extends Element> = {
    [K in EventName as `on:${K}${ModifierSuffix}`]?: DomEventHandler<E, K>;
} & {
    [K in EventName as `on${Capitalize<K>}`]?: DomEventHandler<E, K>;
} & {
    [K in `on:[${string}]${ModifierSuffix}`]?: (event: Event & {
        currentTarget: E;
    }) => void;
};
type DataAriaProps = {
    [K in `data-${string}`]?: Primitive;
} & {
    [K in `aria-${string}`]?: Primitive;
};
export type Props<E extends Element = Element> = ElementLikeProps<E> & OnProps<E> & DataAriaProps & {
    ref?: (el: E | null) => void;
    class?: MaybeReactive<ClassValue>;
    className?: MaybeReactive<ClassValue>;
    style?: MaybeReactive<StyleValue>;
    children?: Child;
};
export type Component<P = any> = (props: P & {
    children?: Child;
}) => Child;
export {};
//# sourceMappingURL=types.d.ts.map