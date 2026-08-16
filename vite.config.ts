import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
});
