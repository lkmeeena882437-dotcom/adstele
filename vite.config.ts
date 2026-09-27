import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_SITE_URL = "https://adstele.vercel.app";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");
  const siteUrl = (env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

  const siteOriginPlugin: Plugin = {
    name: "adstele-site-origin",
    transformIndexHtml(html) {
      return html.replaceAll("__SITE_URL__", siteUrl);
    },
    closeBundle() {
      // Vite copies public files verbatim; replace the origin tokens in the
      // emitted sitemap and robots file after a production build.
      if (mode !== "production") return;
      for (const filename of ["robots.txt", "sitemap.xml"]) {
        const outputPath = path.resolve(__dirname, "dist", filename);
        if (!existsSync(outputPath)) continue;
        const contents = readFileSync(outputPath, "utf8");
        writeFileSync(outputPath, contents.replaceAll("__SITE_URL__", siteUrl));
      }
    },
  };

  return {
    plugins: [react(), tailwindcss(), siteOriginPlugin],
    server: {
      host: "0.0.0.0",
      allowedHosts: true,
    },
    build: {
      // three.js ships as its own lazy-loaded chunk
      chunkSizeWarningLimit: 1000,
    },
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
  };
});
