import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react({fastRefresh: false})],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@customTypes": path.resolve(__dirname, "src/types"),
      "@reducers": path.resolve(__dirname, "src/reducers"),
      "@utilities": path.resolve(__dirname, "src/utilities"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setupTests.ts',
  }
} as UserConfig);
