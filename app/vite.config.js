import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  build: {
    cssCodeSplit: true, // Ensure CSS is combined
    outDir: "dist", // Output directory
    rollupOptions: {
      output: {
        // manualChunks: undefined, // Prevent code splitting
        entryFileNames: "content.js", // Name output as bundle.js
        assetFileNames: "content.css",
      },
    },
  },
});
