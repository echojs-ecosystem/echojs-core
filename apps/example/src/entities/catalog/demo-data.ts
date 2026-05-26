export type CatalogVariant = { readonly id: string; readonly name: string; readonly sku: string };

export type CatalogProduct = {
  readonly id: string;
  readonly name: string;
  readonly variants: readonly CatalogVariant[];
};

export type CatalogCategory = {
  readonly id: string;
  readonly name: string;
  readonly products: readonly CatalogProduct[];
};

export const CATALOG_CATEGORIES: readonly CatalogCategory[] = [
  {
    id: "electronics",
    name: "Электроника",
    products: [
      {
        id: "phone",
        name: "Смартфон Echo",
        variants: [
          { id: "128gb", name: "128 GB", sku: "ECHO-PH-128" },
          { id: "256gb", name: "256 GB", sku: "ECHO-PH-256" },
        ],
      },
      {
        id: "tablet",
        name: "Планшет Echo Pad",
        variants: [{ id: "wifi", name: "Wi‑Fi", sku: "ECHO-TB-W" }],
      },
    ],
  },
  {
    id: "home",
    name: "Дом",
    products: [
      {
        id: "lamp",
        name: "Умная лампа",
        variants: [
          { id: "white", name: "Белая", sku: "ECHO-L-W" },
          { id: "rgb", name: "RGB", sku: "ECHO-L-R" },
        ],
      },
    ],
  },
] as const;

export const findCategory = (categoryId: string): CatalogCategory | undefined =>
  CATALOG_CATEGORIES.find((c) => c.id === categoryId);

export const findProduct = (
  categoryId: string,
  productId: string,
): { category: CatalogCategory; product: CatalogProduct } | undefined => {
  const category = findCategory(categoryId);
  const product = category?.products.find((p) => p.id === productId);
  return category && product ? { category, product } : undefined;
};

export const findVariant = (
  categoryId: string,
  productId: string,
  variantId: string,
):
  | { category: CatalogCategory; product: CatalogProduct; variant: CatalogVariant }
  | undefined => {
  const found = findProduct(categoryId, productId);
  const variant = found?.product.variants.find((v) => v.id === variantId);
  return found && variant ? { ...found, variant } : undefined;
};
