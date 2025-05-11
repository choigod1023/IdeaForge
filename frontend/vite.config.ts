import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "choigod1023.p-e.kr",
    port: 5173,
    hmr: {
      host: "choigod1023.p-e.kr",
    },
  },
});
