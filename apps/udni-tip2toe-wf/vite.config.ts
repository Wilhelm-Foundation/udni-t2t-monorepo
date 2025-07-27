import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    host: "0.0.0.0",
    port: 5173, // or 5174, 3000, etc.
    watch: { usePolling: true },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
