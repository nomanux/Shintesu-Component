import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // App source alias
      "@": path.resolve(__dirname, "./src"),

      // Kit alias — files outside the project root import from here.
      // The entries below pin every bare-module the kit uses to THIS project's
      // node_modules so Rollup can find them regardless of file location.
      "@kit": path.resolve(__dirname, "../kit"),
      "react": path.resolve(__dirname, "node_modules/react"),
      "react/jsx-runtime": path.resolve(__dirname, "node_modules/react/jsx-runtime"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      "antd": path.resolve(__dirname, "node_modules/antd"),
      "@ant-design/icons": path.resolve(__dirname, "node_modules/@ant-design/icons"),
    },
    // Guarantee a single copy of each package — prevents "multiple React" bugs.
    dedupe: ["react", "react-dom", "antd", "@ant-design/icons"],
  },
  server: {
    // Allow the dev server to serve files from outside the project root (kit/).
    fs: {
      allow: [".."],
    },
  },
});
