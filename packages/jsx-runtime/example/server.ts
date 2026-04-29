#!/usr/bin/env bun
/**
 * Development server for EchoJS JSX Runtime examples
 * Supports hot reloading and TSX compilation
 */

import { serve } from "bun";

const PORT = process.env.PORT || 3000;
const EXAMPLE_DIR = import.meta.dir;
const PACKAGE_ROOT = `${EXAMPLE_DIR}/..`;

// MIME types
const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".ts": "application/typescript",
  ".tsx": "application/typescript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

function getMimeType(path: string): string {
  const ext = path.substring(path.lastIndexOf("."));
  return MIME_TYPES[ext] || "text/plain";
}

// Transpile TSX to JS using Bun's transpiler
async function transpileTSX(sourcePath: string): Promise<string> {
  const file = await Bun.file(sourcePath).text();

  const result = await Bun.build({
    entrypoints: [sourcePath],
    target: "browser",
    format: "esm",
    jsx: "automatic",
    jsxImportSource: "@echojs-ecosystem/jsx-runtime",
    external: ["@echojs-ecosystem/jsx-runtime", "@echojs-ecosystem/reactivity"],
  });

  if (!result.success) {
    const errors = result.logs.map((log) => `${log.message}`).join("\n");
    throw new Error(`Transpile failed:\n${errors}`);
  }

  // Get the built output
  for (const output of result.outputs) {
    if (output.kind === "entry-point") {
      return await output.text();
    }
  }

  throw new Error("No output generated");
}

// Handle import paths for our packages
function resolveImportPath(specifier: string, importer: string): string | null {
  if (specifier === "@echojs-ecosystem/jsx-runtime") {
    return `${PACKAGE_ROOT}/src/index.ts`;
  }
  if (specifier === "@echojs-ecosystem/reactivity") {
    return `${PACKAGE_ROOT}/../reactivity/src/index.ts`;
  }
  return null;
}

console.log(`🚀 EchoJS Example Server`);
console.log(`📁 Serving from: ${EXAMPLE_DIR}`);
console.log(`🔗 http://localhost:${PORT}`);
console.log(`\nPress Ctrl+C to stop\n`);

serve({
  port: PORT,
  async fetch(request) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Default to index.html
    if (pathname === "/") {
      pathname = "/index.html";
    }

    const filePath = `${EXAMPLE_DIR}${pathname}`;

    // Handle TSX files - transpile them
    if (pathname.endsWith(".tsx")) {
      try {
        const transpiled = await transpileTSX(filePath);
        return new Response(transpiled, {
          headers: {
            "Content-Type": "application/javascript",
            "Cache-Control": "no-cache",
          },
        });
      } catch (error) {
        console.error(`Transpile error for ${pathname}:`, error);
        return new Response(
          `// Transpile Error:\n// ${(error as Error).message.replace(/\n/g, "\n// ")}`,
          {
            status: 500,
            headers: { "Content-Type": "application/javascript" },
          },
        );
      }
    }

    // Handle regular files
    try {
      const file = Bun.file(filePath);
      const exists = await file.exists();

      if (!exists) {
        return new Response("Not Found", { status: 404 });
      }

      const content = await file.text();
      const mimeType = getMimeType(pathname);

      // Inject hot reload script for HTML files
      if (pathname.endsWith(".html")) {
        const hotReloadScript = `
          <script>
            // Simple hot reload
            let ws;
            function connect() {
              ws = new WebSocket('ws://localhost:${PORT}/_ws');
              ws.onmessage = () => location.reload();
              ws.onclose = () => setTimeout(connect, 1000);
            }
            connect();
          </script>
        `;
        const modifiedContent = content.replace("</body>", `${hotReloadScript}</body>`);
        return new Response(modifiedContent, {
          headers: { "Content-Type": mimeType },
        });
      }

      return new Response(content, {
        headers: { "Content-Type": mimeType },
      });
    } catch (error) {
      console.error(`Error serving ${pathname}:`, error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
  websocket: {
    message(ws, message) {
      ws.send("pong");
    },
  },
});
