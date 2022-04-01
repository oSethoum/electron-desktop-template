import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const rendererPath = resolve(__dirname, "./src/renderer");
const outDirRenderer = resolve(__dirname, "./app/renderer");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  root: rendererPath,
  build: {
    outDir: outDirRenderer,
    emptyOutDir: true,
  },
  resolve: {
    alias: [
      {
        find: "@renderer",
        replacement: resolve(__dirname, "src/renderer"),
      },
      {
        find: "@common",
        replacement: resolve(__dirname, "src/common"),
      },
    ],
  },
});
