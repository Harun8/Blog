import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1000, // Increase the chunk size limit to 1000 kB
    base: "./",
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "/src/main.jsx",
    },
    // other build options
  },
  plugins: [react()],
});
