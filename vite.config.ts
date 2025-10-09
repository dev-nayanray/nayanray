import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost", // Ensures it binds properly
    port: 5173,        // You can change this if needed (e.g., 5174)
    strictPort: true,  // Prevents port auto-change (important for HMR)
    open: true,        // Automatically opens browser
    cors: true,
    hmr: {
      protocol: "ws",  // Use WebSocket explicitly
      host: "localhost",
      port: 5173,      // Match the same port
    },
  },
});
