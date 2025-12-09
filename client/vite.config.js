import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/login": "http://localhost:3000",
      "/logout": "http://localhost:3000",
      "/disciplinas": "http://localhost:3000",
      "/alocacoes": "http://localhost:3000",
      "/me": "http://localhost:3000",
    },
  },
});
