export type BundleSizeRow = {
  package: string;
  entry: string;
  bytes: number;
  gzipBytes: number;
  brotliBytes: number;
};

export type BundleSizeReport = {
  kind: "bundle-size";
  generatedAt: string;
  node: string;
  root: string;
  rows: BundleSizeRow[];
};

