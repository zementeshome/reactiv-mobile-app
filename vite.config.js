import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // 1. Import Node's path tool

// https://vite.dev
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true, // Tells Vite to look up your tsconfig.json automatically
    alias: {
      // Replaces the old __dirname with modern ES module mapping
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    globals: true,
  },
});
