import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 100000000
},
  plugins: [react()],
  define: {
    global: "globalThis",
    "process.env": {},
  },

});