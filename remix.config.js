import fs from "node:fs";

// Related: https://github.com/remix-run/remix/issues/2835#issuecomment-1144102176
// Replace the HOST env var with SHOPIFY_APP_URL so that it doesn't break the remix server. The CLI will eventually
// stop passing in HOST, so we can remove this workaround after the next major release.
if (
  process.env.HOST &&
  (!process.env.SHOPIFY_APP_URL ||
    process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}

// Binds env vars for local development with Cloudflare pages
if (process.env.NODE_ENV === "development") {
  fs.writeFileSync(
    ".dev.vars",
    `SHOPIFY_APP_URL=${process.env.SHOPIFY_APP_URL}\nSHOPIFY_API_KEY=${process.env.SHOPIFY_API_KEY}\nSHOPIFY_API_SECRET=${process.env.SHOPIFY_API_SECRET}\nSCOPES=${process.env.SCOPES}\n`,
  );
}

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  server: "./server.ts",
  appDirectory: "app",
  serverBuildPath: "functions/[[path]].js",
  serverConditions: ["workerd", "worker", "browser"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  dev: {
    command: `npm start -- --port=${process.env.PORT}`,
    manual: true,
    port: process.env.HMR_SERVER_PORT || 8002,
  },
  future: {},
};
