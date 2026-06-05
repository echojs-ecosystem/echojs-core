import { brotliCompressSync, constants, gzipSync } from "node:zlib";
import { build } from "esbuild";

export async function measureBundle(opts: {
  absEntryPath: string;
  format: "esm" | "iife";
  minify: boolean;
}): Promise<{ bytes: number; gzipBytes: number; brotliBytes: number }> {
  const result = await build({
    entryPoints: [opts.absEntryPath],
    bundle: true,
    write: false,
    platform: "browser",
    format: opts.format,
    minify: opts.minify,
    treeShaking: true,
    metafile: false,
    sourcemap: false,
    logLevel: "silent",
  });

  const out = result.outputFiles?.[0];
  if (!out) {
    throw new Error("esbuild returned no outputFiles (write=false)");
  }

  const bytes = out.contents.byteLength;
  const gzipBytes = gzipSync(out.contents, { level: 9 }).byteLength;
  const brotliBytes = brotliCompressSync(out.contents, {
    params: {
      [constants.BROTLI_PARAM_QUALITY]: 11,
    },
  }).byteLength;

  return { bytes, gzipBytes, brotliBytes };
}

