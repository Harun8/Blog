import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "src/main.jsx",
    },
    // other build options
  },
  plugins: [react()],
});
