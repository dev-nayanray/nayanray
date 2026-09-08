import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost", // Ensures it binds properly
    port: 5173,        // You can change this if needed (e.g. 5174)
    strictPort: true,  // Prevents port auto-change (important for HMR)
    open: true,        // Automatically opens browser
    cors: true,
    hmr: {
      protocol: "ws",  // Use WebSocket explicitly
      host: "localhost",
      port: 5173,      // Match the same port
    },
  },
  build: {
    rollupOptions: {
      output: {
        /* ----------------------------------------------------------------
         *  Manual chunk splitting — splits vendor dependencies into their
         *  own cacheable chunks so that:
         *  1. The main app bundle stays small (faster LCP on the home page)
         *  2. Repeat visits reuse the cached vendor chunks (no re-download)
         *  3. Browsers parallelize the chunk downloads over multiple connections
         *
         *  These chunks change rarely (only on dependency upgrades), so
         *  they cache aggressively across deploys. The app code chunk
         *  changes every deploy, but stays small.
         * ---------------------------------------------------------------- */
        manualChunks: {
          // React core — react, react-dom, react-router-dom
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Animation library — large, changes rarely
          "framer-motion": ["framer-motion"],
          // Icon libraries — tree-shaken but still sizable
          "icons": ["react-icons", "lucide-react"],
          // i18n stack — only loaded when language toggle is used
          "i18n": ["i18next", "react-i18next"],
          // HTTP client — used by api service
          "http": ["axios"],
        },
      },
    },
    // Don't warning about chunk sizes — we're intentionally splitting
    chunkSizeWarningLimit: 700,
  },
});
