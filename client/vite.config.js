// ===========================
// Vite Configuration
// Sets up the React plugin and dev server proxy.
// ===========================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Frontend dev server port
    proxy: {
      // Proxy API requests to the backend during development
      // This avoids CORS issues when frontend and backend run on different ports
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
