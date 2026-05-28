export type DebouncedFn<T extends (...args: never[]) => void> = T & {
    cancel(): void;
    flush(): void;
};
export declare const debounce: <T extends (...args: never[]) => void>(fn: T, ms: number) => DebouncedFn<T>;
//# sourceMappingURL=debounce.d.ts.map