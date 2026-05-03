declare const kSignalBrand: unique symbol;
declare const kReadonlyBrand: unique symbol;
export type BrandedSignal = {
  [kSignalBrand]: true;
  [kReadonlyBrand]?: true;
};
export declare const brandWritable: <T extends object>(obj: T) => T & BrandedSignal;
export declare const brandReadonly: <T extends object>(obj: T) => T & BrandedSignal;
export declare const isBrandedSignal: (value: unknown) => value is BrandedSignal;
export declare const isBrandedReadonlySignal: (value: unknown) => value is BrandedSignal;
export {};
//# sourceMappingURL=guards.d.ts.map
